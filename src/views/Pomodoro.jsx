import { useState, useEffect, useReducer } from "react";
import PomodoroPhaseIndicator from "../components/PomodoroPhaseIndicator";

export default ({ timeState }) => {
  const workTime = 25 * 60; // 25 minutes
  const shortBreakTime = 10 * 60; // 10 minutes
  const longBreakTime = 30 * 60; // 30 minutes
  // the phases of pomodoro
  const phaseTemplate = [
    { title: "Work", active: true, time: workTime },
    { title: "Short Break", active: false, time: shortBreakTime },
    { title: "Work", active: false, time: workTime },
    { title: "Short Break", active: false, time: shortBreakTime },
    { title: "Work", active: false, time: workTime },
    { title: "Short Break", active: false, time: shortBreakTime },
    { title: "Work", active: false, time: workTime },
    { title: "Long Break", active: false, time: longBreakTime },
  ];

  const phaseReducer = (state, { type, payload }) => {
    // ignore actions not accepted
    const acceptedActions = ["set"];
    if (!acceptedActions.includes(type)) {
      return state;
    }

    switch (type) {
      case "set":
        // ignore if trying to set to a negative number
        if (payload < 0) {
          return state;
        }
        //  set to 0 if going over 7
        else if (payload > 7) {
          payload = 0;
        }
        // copy phase array
        const newPhaseArr = [];
        for (let phase of state.phases) {
          newPhaseArr.push({ ...phase });
        }
        // set selected phase to active
        newPhaseArr[payload].active = true;
        // set previously selected phase to inactive
        newPhaseArr[state.currentIndex].active = false;

        // return new state
        return {
          ...state,
          currentIndex: payload,
          phases: newPhaseArr,
          currentPhase: newPhaseArr[payload],
        };
    }
  };

  const [{ currentPhase, phases, currentIndex }, activePhaseDispatch] =
    useReducer(phaseReducer, {
      currentIndex: 0,
      phases: phaseTemplate,
      currentPhase: phaseTemplate[0],
    });

  // Time
  const [time, setTime] = timeState;

  // Wether the timer is running
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    // if not paused, run timer
    if (running) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    // otherwise remove it
    else {
      clearInterval(interval);
    }

    // if the time has run out then move to the next phase
    if (time <= 0) {
      setRunning(false);
      activePhaseDispatch({ type: "set", payload: currentIndex + 1 });
      setTime(phases[(currentIndex + 1) % 8].time);
    }

    // remove interval on reload
    return () => clearInterval(interval);
  }, [running, time]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-center">
        {currentPhase.title === "Work"
          ? "Time to Focus"
          : currentPhase.title === "Short Break"
          ? "Time for a short break"
          : currentPhase.title === "Long Break"
          ? "Time for a long break"
          : "You broke the site, thanks"}
      </h1>
      <div className="flex bg-gray-500 p-2 w-2xl justify-between rounded-lg my-3">
        {phases.map(({ title, active }, index) => (
          <PomodoroPhaseIndicator
            title={title}
            active={active}
            key={title + index}
            clickHander={() => {
              if (active) return;
              setRunning(false);
              activePhaseDispatch({ type: "set", payload: index });
              setTime(phases[index].time);
            }}
          />
        ))}
      </div>
      <h1 className="text-5xl text-center mb-4">{`${Math.floor(time / 60)}:${
        time % 60 < 10 ? "0" + (time % 60) : time % 60
      }`}</h1>
      <button
        className="font-extrabold drop-shadow-md drop-shadow-black/30 bg-gray-600 hover:bg-gray-700 text-white px-3 py-0.5 text-center pb-1 rounded-lg w-3xs"
        onClick={() => {
          setRunning((cur) => !cur);
        }}
      >
        {running ? "||" : "⩥"}
      </button>
    </div>
  );
};
