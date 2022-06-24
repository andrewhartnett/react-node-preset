import { useState } from 'react'

export default function useModel (initial = '', onChange) {
  const [value, setValue] = useState(initial)

  const handler = (e) => {
    setValue(e.target.value)
    onChange && onChange(e)
  }

  const model = { value, onChange: handler }
  return [model, setValue]
}
