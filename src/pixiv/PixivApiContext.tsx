import React, { PropsWithChildren, useContext, useRef } from "react"
import PixivApi from "./PixivApi"

type ContextType = PixivApi

const Context = React.createContext<ContextType | undefined>(undefined)

export function PixivApiProvider(props: PropsWithChildren<{}>) {
  const apiRef = useRef(new PixivApi())
  return (
    <Context.Provider value={apiRef.current}>{props.children}</Context.Provider>
  )
}

export function usePixivApi() {
  const api = useContext(Context)
  if (!api) {
    throw new Error(
      "usePixivApi() can only be used inside of <PixivApiProvider />",
    )
  }
  return api
}
