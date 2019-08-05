import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import PixivApi from "./PixivApi"

const api = new PixivApi()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body
  const result = await api.login(username, password)
  res.send(result)
})

app.listen(4000)
