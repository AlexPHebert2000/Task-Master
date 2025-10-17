import {useState, useEffect} from 'react';

export default (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(key) ?? "false");
    return saved || defaultValue;
  })

  useEffect(
    () => {localStorage.setItem(key, JSON.stringify(value));},
    [key, value]
  )
  
  return [value, setValue]
}