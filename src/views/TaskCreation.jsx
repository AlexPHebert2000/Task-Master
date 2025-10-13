import { useState } from "react";

export default () => {
  const [input, setInput] = useState("");

  const handleInput = (e,  setter) => {
    setter(e.target.value);
  }

  const handleAdd = () => {
    console.log(input);
    setInput("");
  }

  return (
    <div>
      <div>
        <input type="text" value={input} onChange={(e) => handleInput(e, setInput)}></input>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}