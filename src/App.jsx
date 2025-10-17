import { useReducer, useState } from "react"
import TaskCreation from "./views/TaskCreation"
import TodoList from "./views/TodoList";
import Pomodoro from "./views/Pomodoro";

function App() {

  const listReducer = (state, {type, payload}) => {
    console.log(state, type, payload)
    const acceptedActions = ["add", "remove", "complete"];
    if (! acceptedActions.includes(type)){ return state }
    switch(type){
      case("add"):
        return {...state, inProgress: [...state.inProgress, payload]};
      case("remove"):
        const newList = [...state.inProgress];
        newList.splice(newList.indexOf(payload), 1)
        return {...state, inProgress: newList}
      case("complete"):
        const newProgress = [...state.inProgress];
        const newComplete = [...state.complete];
        newProgress.splice(newProgress.indexOf(payload), 1);
        newComplete.push(payload);
        return {...state, inProgress: newProgress, complete: newComplete};

      default:
        return state
    }
  }

  const  [{inProgress, complete}, toDoDispatch] = useReducer(listReducer, {inProgress: [], complete: []})
  const nameState = useState("");
  const submitState = useState(false)
  const views = {
    "create": <TaskCreation listDispatch={toDoDispatch} list={inProgress} nameState={nameState} submitState={submitState}/>,
    "list": <TodoList {...{inProgress, complete}} dispatch={toDoDispatch}/>,
    "timer": <Pomodoro />
  }

  const [currentView, setView] = useState("create");

  

  return (
    <div class="flex flex-col justify-center content-center">
      <div class="content-center bg-gray-700 px-5 text-3xl py-2 flex flex-row mb-4 drop-shadow-gray-950/20 drop-shadow-md">
        <h1 class="text-white font-bold text-center mr-3" >Task Master</h1>
        <h1 onClick={() => {setView("create")}} class="mx-3 bg-gray-500/75 drop-shadow-md p-1 rounded-sm">📝</h1>
        <h1 onClick={() => {setView("list")}} class="mx-3 bg-gray-500/75 drop-shadow-md p-1 rounded-sm">☑️</h1>
        <h1 onClick={() => {setView("timer")}} class="mx-3 bg-gray-500/75 drop-shadow-md p-1 rounded-sm">🕑</h1>
        <h1 class="mx-3 bg-gray-500/75 drop-shadow-md p-1 rounded-sm">🏆</h1>
      </div>
      <div class="flex justify-center">
      {views[currentView]}
      </div>
    </div>
  )
}

export default App
