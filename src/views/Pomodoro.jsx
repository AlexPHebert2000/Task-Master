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

  
  const phaseTemplate = [
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
    const acceptedActions = ["set"];
    if (! acceptedActions.includes(type)){ return state }

    switch(type){
      case("set"):
        if (payload < 0){ return state }
        else if (payload > 7){ payload = 0}
        const newPhaseArr = [...state.phases]
        newPhaseArr[payload].active = true;
        newPhaseArr[state.currentIndex].active = false;
        return {
          ...state,
          currentIndex: payload,
          phases: newPhaseArr
        }
    }
  }

  const [{phases, currentIndex}, activePhaseDispatch] = useReducer(phaseReducer, {currentIndex: 0, phases: phaseTemplate})
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
      <div className="flex bg-gray-500 p-2 w-2xl justify-between rounded-lg">
        {phases.map(({title, active}, index) => 
          <PomodoroPhaseIndicator title={title} active={active} index={index}/>
        )}
      </div>
      <button onClick={() => {activePhaseDispatch({type: "set", payload: currentIndex + 1})}}>Next</button>
      <h1>{`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`}</h1>
      <button onClick={() => {setRunning((cur) => !cur)}}>{running ? "stop" : "start"}</button>
    </div>
  )
}