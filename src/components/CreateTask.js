import { useState } from "react";

export default function CreateTask() {
    const [inputs, setInputs] = useState({})
    const handleChange = (event) 
    const handleSubmit = (event) => {
        event.preventDefault();
    } 
    return (
    <div>
      <h1>Добавить задачу</h1>
      <form onSubmit={handleSubmit}>
        <label>Название: </label>
        <input type="text" name="title" onChange={handleChange}></input>
        <br />
        <label>Описание: </label>
        <input type="text" name="description"></input>
        <br />
        <label>Ответственный: </label>
        <input type="text" name="case-staff"></input>
        <br />
        <button>Создать</button>
      </form>
    </div>
  );
}
