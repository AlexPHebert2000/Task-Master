import { useState } from "react";

export default ({listDispatch}) => {
  const [input, setInput] = useState("");

  const handleInput = (e,  setter) => {
    setter(e.target.value);
  }

  const handleAdd = () => {
    listDispatch({type: "add", payload: input})
    setInput("");
  }

  const handleEnter = (e) => {
    if (e.key === "Enter"){
      handleAdd();
    }
  }

  return (
    <div>
      <div>
        <input type="text" value={input} onChange={(e) => handleInput(e, setInput)} onKeyDown={handleEnter}></input>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}