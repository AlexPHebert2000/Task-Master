import { useReducer, useState } from "react";
import useLocalStorageState from "./hooks/useLocalStorageState";
import useLocalStorageReducer from "./hooks/useLocalStorageReducer";
import TaskCreation from "./views/TaskCreation";
import TodoList from "./views/TodoList";
import NavBar from "./components/NavBar";

function App() {
  
  const listReducer = (state, { type, payload }) => {
    console.log(state, type, payload);
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
  };

  const [currentView, setView] = useState("create");

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
