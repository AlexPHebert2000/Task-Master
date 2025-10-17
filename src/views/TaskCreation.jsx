import { useState } from "react";

import Task from "../components/Task";

export default ({listDispatch, list, nameState, submitState}) => {
  const [name, setName] = nameState;
  const [submitted, toggleSubmit] = submitState;
  const [input, setInput] = useState("");

  const handleInput = (e,  setter) => {
    setter(e.target.value);
  }

  const handleAdd = () => {
    if (input === ""){ return }
    listDispatch({type: "add", payload: input})
    setInput("");
  }

  const handleEnter = (e) => {
    if (e.key === "Enter"){
      handleAdd();
    }
  }

  const handleSubmit = () => {
    if (name.length > 0){
      toggleSubmit(true);
    }
  }

  const handleChangeUsername  = () => {
    toggleSubmit(false);
  }
  
  return (
    <div class="px-2 py-1 flex flex-col justify-center items-center">
      <h1 class="text-4xl mb-6">Set your goals</h1>
      <div>
        {
          submitted ?
          <p className="inline mr-2">{name}</p> :
          <input type="text" placeholder="Your Name"  
          value={name} onChange={(e) => handleInput(e, setName)}
          class="border-1 rounded-md px-0.5 mr-2"
          ></input>
        }
        {submitted ? <button class="text-blue-400 border-2 px-1 rounded-sm hover:text-white hover:bg-blue-400" onClick={handleChangeUsername}>Change Username</button> : <button class="text-blue-400 border-2 px-1 rounded-sm hover:text-white hover:bg-blue-400" onClick={handleSubmit}>Submit</button>}
      </div>
      <hr className="w-lg my-11"/>
      <div>
        <input type="text" placeholder="Wash the dishes"  
          value={input} onChange={(e) => handleInput(e, setInput)} onKeyDown={handleEnter}
          class="border-1 rounded-md px-0.5 mr-2"
        ></input>
        <button class="text-blue-400 border-2 px-1 rounded-sm hover:text-white hover:bg-blue-400" onClick={handleAdd}>Add</button>
      </div>
      <div>
        {
          list.map((item, index) => (
            <Task title={item} modes={["remove"]} dispatch={listDispatch} key={index}/>
          ))
        }
      </div>
      {list.length > 3 ? null : <h1 className="font-semibold text-red-400">Please add at least 4 tasks to begin!</h1>}
    </div>
  )
}