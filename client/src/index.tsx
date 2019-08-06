import ApolloClient from "apollo-boost"
import React from "react"
import { ApolloProvider } from "react-apollo"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

const client = new ApolloClient({
  uri: "http://localhost:4000",
  credentials: "include",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)

serviceWorker.register()
