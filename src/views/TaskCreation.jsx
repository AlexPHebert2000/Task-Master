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
    <div>
      <h1>Set your goals</h1>
      <div>
        <input type="text" value={input} onChange={(e) => handleInput(e, setInput)} onKeyDown={handleEnter}
         class="border-2 "
        ></input>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        {
          list.map((item) => (
            <div class="m-0.5"  id="list-item" key={item}>
              <p class="inline mr-2">{item}</p>
              <button class="text-red-500 hover:bg-red-500 hover:text-white border-1 rounded-sm px-1.5" id="removal-button" onClick={() => {handleRemove(item)}}>✕</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}