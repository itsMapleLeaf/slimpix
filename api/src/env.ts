import "dotenv/config"

function getVar(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`"${name}" environment variable not defined`)
  }
  return value
}

export const sessionSecret = getVar("SESSION_SECRET")
