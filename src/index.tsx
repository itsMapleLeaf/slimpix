import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { PixivApiProvider } from "./pixiv/PixivApiContext"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <PixivApiProvider>
    <App />
  </PixivApiProvider>,
  document.getElementById("root"),
)

serviceWorker.register()
