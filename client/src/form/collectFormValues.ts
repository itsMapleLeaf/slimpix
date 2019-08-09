type FormHookMap = {
  [key: string]: {
    value: unknown
  }
}

function collectFormValues<I extends FormHookMap>(inputs: I) {
  const values = {} as { [K in keyof I]: I[K]["value"] }
  for (const inputName in inputs) {
    values[inputName] = inputs[inputName].value
  }
  return values
}

export default collectFormValues
