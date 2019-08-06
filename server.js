// @ts-check
const express = require("express")
const http = require("http")

const app = express()

app.post("/api", (clientRequest, clientResponse) => {
  const proxy = http.request(
    `http://localhost:4000`,
    {
      headers: clientRequest.headers,
      method: "post",
    },
    (apiResponse) => {
      clientResponse.writeHead(apiResponse.statusCode, apiResponse.headers)
      apiResponse.pipe(clientResponse)
    },
  )

  clientRequest.pipe(
    proxy,
    { end: true },
  )
})

app.use(express.static(`client/build`))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`)
})
