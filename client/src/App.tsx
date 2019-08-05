import Axios from "axios"
import React, { useState } from "react"
import { usePixivApi } from "./pixiv/PixivApiContext"

function App() {
  const api = usePixivApi()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const res = await Axios.post("http://localhost:4000/login", {
      username,
      password,
    })
    console.log(res.data)
  }

  return (
    <div className="App">
      <div>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>login</button>
    </div>
  )
}

export default App
