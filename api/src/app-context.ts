import { Request, Response } from "express"
import { PixivApi } from "./pixiv-api"

export type AppContext = {
  request: Request
  response: Response
  api: PixivApi
}
