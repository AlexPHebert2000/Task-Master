import {useState, useEffect, useReducer} from "react";
import PomodoroPhaseIndicator from "../components/PomodoroPhaseIndicator";

export default () => {
  
  const [mode, setMode] = useState("focus");
  const modes = {
    "focus": 25 * 60,
    "short": 10 * 60,
    "long": 30 * 60
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

  
  const phases = [
    {title: "Work", active: true},
    {title: "Short Break", active: false},
    {title: "Work", active: false},
    {title: "Short Break", active: false},
    {title: "Work", active: false},
    {title: "Short Break", active: false},
    {title: "Work", active: false},
    {title: "Long Break", active: false},
  ]

  const phaseReducer = (state, {type, payload}) => {
    const acceptedActions = ["next"];
    if (! acceptedActions.includes(type)){ return state }

    switch(type){
      case("next"):
        const newPhases = [...state];
        newPhases[payload].active = false;
        newPhases[(payload + 1) % 7] = true;
        return newPhases;
      default:
        return state;
    }
  }

  const [activePhases, activePhaseDispatch] = useReducer(phaseReducer, phases)
  return (
    <div>
      <h1>
        {
          mode === "focus" ? "Time to Focus" :
          mode === "short" ? "Time for a short break":
          mode === "long" ? "Time for a long break":
          "You broke the site, thanks" 
        }
      </h1>
      <div>
        {activePhases.map(({title, active}) => 
          <PomodoroPhaseIndicator title={title} active={active}/>
        )}
      </div>
      <h1>{`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`}</h1>
      <button onClick={() => {setRunning((cur) => !cur)}}>{running ? "stop" : "start"}</button>
    </div>
  )
}