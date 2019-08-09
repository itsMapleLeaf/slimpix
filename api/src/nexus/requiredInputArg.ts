import { arg } from "nexus"

export default function requiredInputArg(type: any) {
  return arg({ type, required: true })
}
