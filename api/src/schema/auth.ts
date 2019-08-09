import { inputObjectType } from "nexus"
import { ObjectDefinitionBlock } from "nexus/dist/core"
import requiredInputArg from "../nexus/requiredInputArg"

const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.string("username", { required: true })
    t.string("password", { required: true })
  },
})

export function useAuthQuery(t: ObjectDefinitionBlock<any>) {
  t.boolean("authUser", {
    resolve(root, args, { request }) {
      return request.session!.user != null
    },
  })
}

export function useAuthMutation(t: ObjectDefinitionBlock<any>) {
  t.boolean("login", {
    args: {
      input: requiredInputArg(LoginInput),
    },

    async resolve(_, { input }, context) {
      const { username, password } = input
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
}
