import {useState, useEffect} from 'react';
import { getQuote } from '../scripts/quotes';

export default () => {
  const [quote, setQuote] = useState("");

  useEffect(
    () => {
      (async () => {setQuote(await getQuote());})()
    }
    , [quote])

    return (
      <div>
        <hr/>
        <p>{quote}</p>
        <hr/>
      </div>
    )
}