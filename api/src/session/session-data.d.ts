import { SessionUser } from "./session-user"

declare global {
  namespace Express {
    interface SessionData {
      user?: SessionUser
    }
  }
}
