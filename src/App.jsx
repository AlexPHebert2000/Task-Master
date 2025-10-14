import { useReducer } from "react"
import TaskCreation from "./views/TaskCreation"

function App() {

  const listReducer = (state, {type, payload}) => {
    console.log(state, type, payload)
    const acceptedActions = ["add", "remove"];
    if (! acceptedActions.includes(type)){ return state }
    switch(type){
      case("add"):
        return {...state, inProgress: [...state.inProgress, payload]};
      case("remove"):
        const newList = [...state.inProgress];
        newList.splice(newList.indexOf(payload), 1)
        return {...state, inProgress: newList}
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
          inProgress.map((todo) => (
              <li key={todo} >
                <p>{todo}</p>
                <button onClick={() => {toDoDispatch({type: "remove", payload: todo})}}>×</button>
              </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
