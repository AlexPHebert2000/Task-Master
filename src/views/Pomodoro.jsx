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
    let interval;

    if (running){
      interval = setInterval(() => {
          setTime((time) => time - 1);
      }, 1000);
    }
    else {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  },[running]);

  return (
    <div>
      <h1>{`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`}</h1>
      <button onClick={() => {setRunning((cur) => !cur)}}>{running ? "stop" : "start"}</button>
    </div>
  )
}