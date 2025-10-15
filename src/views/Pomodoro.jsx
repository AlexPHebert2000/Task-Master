import {useState, useEffect} from "react";

export default () => {
  
  const [mode, setMode] = useState("focus");
  const modes = {
    "focus": 25 * 60,
    "short": 5 * 60,
    "long": 15 * 60
  };

  const [running, setRunning] = useState(true);

  const [time, setTime] = useState(modes[mode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  return (
    <>
      <h1>{`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`}</h1>
    </>
  )
}