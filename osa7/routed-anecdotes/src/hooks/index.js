import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue("")
  }

  const allReturnValues = {
    type,
    value,
    onChange,
    reset
  }

  const getInputProps = () => {
    const { reset, ...otherProps } = allReturnValues;
    return otherProps;
  }

  return { ...allReturnValues, getInputProps }
}