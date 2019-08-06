import compression from "compression"
import session from "express-session"
import { GraphQLServer } from "graphql-yoga"
import { makeSchema, mutationType, queryType, stringArg } from "nexus"
import { AppContext } from "./app-context"
import { sessionSecret } from "./env"
import { days } from "./helpers/days"
import { PixivApi } from "./pixiv-api"

type UserRecord = {
  [username in string]?: {
    username: string
    password: string
  }
}

const users: UserRecord = {}

const Query = queryType({
  definition(t) {
    t.boolean("login", {
      resolve(root, args, { request }) {
        return request.session != null && request.session.user != null
      },
    })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.boolean("signup", {
      args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },

      async resolve(_, { username, password }) {
        if (users[username]) {
          throw new Error("Another User with same username exists.")
        }

        users[username] = { username, password }

        return true
      },
    })

    t.boolean("login", {
      args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },

      async resolve(_, { username, password }, { request }) {
        const user = users[username]
        const isPasswordCorrect = user != null && user.password === password

        if (!user || !isPasswordCorrect) {
          throw new Error("Invalid username or password")
        }

        request.session!.user = user

        return true
      },
    })

    t.boolean("logout", {
      async resolve(root, args, { request }) {
        if (request.session && request.session.user) {
          delete request.session.user
          return true
        }
        return false
      },
    })
  },
})

const schema = makeSchema({
  types: [Query, Mutation],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts",
  },
  typegenAutoConfig: {
    contextType: "ctx.AppContext",
    sources: [
      {
        alias: "ctx",
        source: `${__dirname}/app-context.ts`,
      },
    ],
  },
})

const server = new GraphQLServer({
  schema,
  context: (params): AppContext => ({
    ...params,
    api: new PixivApi(),
  }),
})

server.express.use(compression())

server.express.use(
  session({
    name: "qid",
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: days(30),
    },
  }),
)

async function startServer() {
  const port = process.env.PORT || 4000

  await server.start({
    port,
    cors: {
      origin: ["http://localhost:3000", "http://localhost:4000"],
      credentials: true,
    },
  })

  console.log(`Server is running on http://localhost:${port}`)
}

startServer().catch(console.error)
