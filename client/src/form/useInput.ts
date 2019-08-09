import React, { useMemo, useState } from "react"

export default function useInput() {
  const [value, setValue] = useState("")

  return useMemo(
    () => ({
      value,
      set: setValue,
      bind: {
        value,
        onChange: (event: React.ChangeEvent<{ value: string }>) => {
          setValue(event.target.value)
        },
      },
    }),
    [value],
  )
}
