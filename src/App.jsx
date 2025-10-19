import { useState, useEffect } from "react";

import useLocalStorageState from "./hooks/useLocalStorageState";
import useLocalStorageReducer from "./hooks/useLocalStorageReducer";
import { updateLeaderboard } from "./scripts/leaderboard";

import TaskCreation from "./views/TaskCreation";
import TodoList from "./views/TodoList";
import NavBar from "./components/NavBar";
import Leaderboard from "./views/Leaderboard";

function App() {
  
  const listReducer = (state, { type, payload }) => {
    const acceptedActions = ["add", "remove", "complete"];
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
    const sendUpdate = () => {
      return updateLeaderboard({id, user: name, percentage: (complete.length  / (complete.length + inProgress.length)) * 100});
    }
    sendUpdate().then((r) => {
      console.log("update sent")
      console.log(r)
    });
  }, [complete])

  return (
    <div class="flex flex-col justify-center content-center">
      <NavBar
        setView={setView}
        enableTasks={inProgress.length + complete.length > 3 && nameState[0].length}
      />
      <div class="flex justify-center">{views[currentView]}</div>
    </div>
  );
}

export default App;
