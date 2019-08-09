import { makeSchema, mutationType, queryType } from "nexus"
import { apiRoot } from "../paths"
import { useAuthMutation, useAuthQuery } from "./auth"

const Query = queryType({
  definition(t) {
    useAuthQuery(t)
  },
})

const Mutation = mutationType({
  definition(t) {
    useAuthMutation(t)
  },
})

export const schema = makeSchema({
  types: [Query, Mutation],
  outputs: {
    schema: `${apiRoot}/generated/schema.graphql`,
    typegen: `${apiRoot}/generated/typings.ts`,
  },
  typegenAutoConfig: {
    contextType: "ctx.AppContext",
    sources: [
      {
        alias: "ctx",
        source: `${apiRoot}/app-context.ts`,
      },
    ],
  },
})
