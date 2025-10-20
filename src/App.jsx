import { useState, useEffect } from "react";

import useLocalStorageState from "./hooks/useLocalStorageState";
import useLocalStorageReducer from "./hooks/useLocalStorageReducer";
import { updateLeaderboard, expireLeaderboard } from "./scripts/leaderboard";

import TaskCreation from "./views/TaskCreation";
import TodoList from "./views/TodoList";
import NavBar from "./components/NavBar";
import Leaderboard from "./views/Leaderboard";

function App() {
  
  const listReducer = (state, { type, payload }) => {
    const acceptedActions = ["add", "remove", "complete", "clear", "undoComplete"];
    if (!acceptedActions.includes(type)) {
      return state;
    }
    switch (type) {
      case "add":
        return { ...state, inProgress: [...state.inProgress, payload] };
      case "remove":
        const newList = [...state.inProgress];
        newList.splice(newList.indexOf(payload), 1);
        return { ...state, inProgress: newList };
      case "complete":
        const newProgress = [...state.inProgress];
        const newComplete = [...state.complete];
        newProgress.splice(newProgress.indexOf(payload), 1);
        newComplete.push(payload);
        return { ...state, inProgress: newProgress, complete: newComplete };
      case "clear":
        return { inProgress: [], complete: []}
      case "undoComplete":
        const progress = [...state.inProgress];
        const complete = [...state.complete];
        complete.splice(complete.indexOf(payload), 1);
        progress.push(payload);
        return { ...state, inProgress: progress, complete: complete };
      default:
        return state;
    }
  };

  const [{ inProgress, complete }, toDoDispatch] = useLocalStorageReducer("list", listReducer, {
    inProgress: [],
    complete: [],
  });

  const nameState = useLocalStorageState("name", "");
  const [name, setName] = nameState

  const [id, setId] = useLocalStorageState("id", crypto.randomUUID().slice(0,5))

  const timeState = useState(25 * 60);

  const views = {
    create: (
      <TaskCreation
        listDispatch={toDoDispatch}
        list={inProgress}
        nameState={nameState}
      />
    ),
    list: (
      <TodoList
        {...{ inProgress, complete }}
        dispatch={toDoDispatch}
        timeState={timeState}
      />
    ),
    leaderboard: (
      <Leaderboard />
    )
  };

  const [currentView, setView] = useState("create");

  useEffect(() => {
    // Reset Leaderboard if 24 hours since initialization
    expireLeaderboard()
    // Manage Local Storage, expires after 24 hours
    if (!window.localStorage.getItem("timestamp")){
      window.localStorage.setItem("timestamp", new Date().toJSON());
    }
    else {
      const prevTimestamp = Date.parse(window.localStorage.getItem("timestamp"));
      const currentTime = Date.now();
      if (currentTime - prevTimestamp >= 86400000){
        window.localStorage.setItem("timestamp", new Date().toJSON());
        window.localStorage.setItem("list", JSON.stringify({inProgress: [], complete: []}));
        toDoDispatch({type: "clear"});
      }
    }

    const sendUpdate = async () => {
      await updateLeaderboard({id, user: name, percentage: (complete.length  / (complete.length + inProgress.length)) * 100});
      console.log("update sent")
    }
    sendUpdate()
  }, [complete])

  return (
    <div className="flex flex-col justify-center content-center">
      <NavBar
        setView={setView}
        enableTasks={inProgress.length + complete.length > 3 && nameState[0].length}
      />
      <div className="flex justify-center">{views[currentView]}</div>
    </div>
  );
}

export default App;
