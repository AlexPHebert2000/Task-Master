import { useReducer } from "react"
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
  return (
    <div>
      <TaskCreation listDispatch={toDoDispatch} list={inProgress}/>
      <ul>
        {
          complete.map((completed) => (
            <li key={completed} >
              <s>{completed}</s>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
