import compression from "compression"
import express from "express"
import session from "express-session"
import { GraphQLServer } from "graphql-yoga"
import { makeSchema, mutationType, queryType, stringArg } from "nexus"
import { AppContext } from "./app-context"
import { sessionSecret } from "./env"
import { days } from "./helpers/days"
import { PixivApi } from "./pixiv-api"

const Query = queryType({
  definition(t) {
    t.boolean("authUser", {
      resolve(root, args, { request }) {
        return request.session!.user != null
      },
    })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.boolean("login", {
      args: {
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },

      async resolve(_, { username, password }, context) {
        const data = await context.api.login(username, password)

        context.request.session!.user = {
          pixiv: {
            token: data.access_token,
            refreshToken: data.refresh_token,
            userId: data.user.id,
          },
        }

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
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/typings.ts`,
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

// https://www.npmjs.com/package/express-session#cookiesecure
server.express.set("trust proxy", 1)

server.express.use(
  session({
    name: "session",
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: days(30),
      sameSite: true,
    },
  }),
)

server.express.use(express.static(`${__dirname}/../../client/build`))

async function startServer() {
  const port = process.env.PORT || 4000

  await server.start({
    endpoint: "/api",
    playground: "/api",
    port,
    cors: {
      origin: [
        "http://localhost:3000", // client dev server
        "http://localhost:4000", // api dev server
        "https://enigmatic-citadel-67115.herokuapp.com/", // live heroku url
      ],
      credentials: true,
    },
  })

  console.log(`Api running on http://localhost:${port}`)
}

startServer().catch(console.error)
