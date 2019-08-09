import compression from "compression"
import express from "express"
import session from "express-session"
import { GraphQLServer } from "graphql-yoga"
import { AppContext } from "./app-context"
import { sessionSecret } from "./env"
import { days } from "./helpers/days"
import { clientBuild } from "./paths"
import { PixivApi } from "./pixiv-api"
import { schema } from "./schema"

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

server.express.use(express.static(clientBuild))

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
