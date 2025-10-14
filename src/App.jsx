import { useReducer, useState } from "react"
import TaskCreation from "./views/TaskCreation"

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

  const views = {
    "create": <TaskCreation listDispatch={toDoDispatch} list={inProgress}/>
  }

  const [currentView, setView] = useState("create");

  return (
    <div>
      {views[currentView]}
    </div>
  )
}

export default App
