import { useState } from "react";

export default ({listDispatch, list}) => {
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

  const handleRemove = (item) => {
    listDispatch({type: "remove", payload: item})
  }

  return (
    <div class="px-2 py-1">
      <h1 class="text-3xl mb-3">Set your goals</h1>
      <div>
        <input type="text" placeholder="Wash the dishes"  
          value={input} onChange={(e) => handleInput(e, setInput)} onKeyDown={handleEnter}
          class="border-1 rounded-md px-0.5"
        ></input>
        <button class="text-blue-400 border-2 px-1 rounded-sm hover:text-white hover:bg-blue-400" onClick={handleAdd}>Add</button>
      </div>
      <div>
        {
          list.map((item) => (
            <div class="mt-2"  id="list-item" key={item}>
              <p class="inline mr-2">{item}</p>
              <button class="text-red-500 hover:bg-red-500 hover:text-white border-1 rounded-sm px-1.5" id="removal-button" onClick={() => {handleRemove(item)}}>✕</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}