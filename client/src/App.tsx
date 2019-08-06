import { useMutation, useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React, { useState } from "react"

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

const isLoginQuery = gql`
  query isLogin {
    login
  }
`

function App() {
  const [login, result] = useMutation(loginMutation)
  const isLogin = useQuery(isLoginQuery)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    await login({
      variables: { username, password },
    })
  }

  return (
    <main>
      <section>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </section>

      <section>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>

      <button onClick={handleSubmit}>login</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
      <pre>{JSON.stringify(isLogin.data, null, 2)}</pre>
    </main>
  )
}

export default App
