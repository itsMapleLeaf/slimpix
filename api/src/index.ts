import compression from "compression"
import { GraphQLServer } from "graphql-yoga"
import { makeSchema, mutationType, queryType } from "nexus"
import { AppContext } from "./app-context"
import { PixivApi } from "./pixiv-api"

const Query = queryType({
  definition(t) {
    t.string("test", { resolve: () => "hi" })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.string("test", { resolve: () => "hi" })
  },
})

const schema = makeSchema({
  types: [Query, Mutation],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts",
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

async function startServer() {
  const port = process.env.PORT || 4000
  await server.start({ port })

  console.log(`Server is running on http://localhost:${port}`)
}

startServer().catch(console.error)
