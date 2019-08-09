import { useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React from "react"
import collectFormValues from "../form/collectFormValues"
import useInput from "../form/useInput"

function App() {
  const [login, result] = useMutation(gql`
    mutation login($input: LoginInput!) {
      login(input: $input)
    }
  `)

  const authUserQuery = useQuery(gql`
    query isLogin {
      authUser
    }
  `)

  const username = useInput()
  const password = useInput()

  const handleSubmit = async () => {
    await login({
      variables: { input: collectFormValues({ username, password }) },
    })
  }

  return (
    <main>
      <section>
        <label>username</label>
        <input type="text" {...username.bind} />
      </section>

      <section>
        <label>password</label>
        <input type="password" {...password.bind} />
      </section>

      <button onClick={handleSubmit}>login</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
      <pre>{JSON.stringify(authUserQuery.data, null, 2)}</pre>
    </main>
  )
}

export default App
