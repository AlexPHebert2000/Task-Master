import { useReducer } from "react"
import TaskCreation from "./views/TaskCreation"

function App() {

  const listReducer = (state, {type, payload}) => {
    const acceptedActions = ["add"];
    if (! acceptedActions.includes(type)){ return state }

    switch(type){
      case("add"):
        return {...state, inProgress: [...state.inProgress, payload]};
      default:
        return state
    }
  }

  const  [{inProgress}, toDoDispatch] = useReducer(listReducer, {inProgress: []})

  return (
    <div>
      <TaskCreation listDispatch={toDoDispatch}/>
      <ul>
        {
          inProgress.map((todo) => <li>{todo}</li>)
        }
      </ul>
    </div>
  )
}

export default App
