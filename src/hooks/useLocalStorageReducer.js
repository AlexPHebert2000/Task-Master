import {useReducer, useEffect} from 'react';

export default (key, reducer, initialValue) => {
  const [value, dispatch] = useReducer(reducer, (() => {
    const saved = JSON.parse(localStorage.getItem(key) ?? "false");
    return saved || initialValue;
  })())

  useEffect(
    () => {localStorage.setItem(key, JSON.stringify(value));},
    [key, value]
  )
  
  console.log(value)
  return [value, dispatch]
}