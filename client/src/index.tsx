import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import * as serviceWorker from "./app/serviceWorker"

const client = new ApolloClient({
  uri: "/api",
  credentials: "include",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)

if (process.env.NODE_ENV === "production") {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
