import { useState } from "react";
import axios from "axios";

export default function CreateTask() {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/api/task/save", inputs);
    
    //console.log(inputs);
  };
  return (
    <div>
      <h1>Добавить задачу</h1>
      <form onSubmit={handleSubmit}>
        <label>Название: </label>
        <input type="text" name="title" onChange={handleChange}></input>
        <br />
        <label>Описание: </label>
        <input type="text" name="description" onChange={handleChange}></input>
        <br />
        <label>Ответственный: </label>
        <input type="text" name="case-staff" onChange={handleChange}></input>
        <br />
        <button>Создать</button>
      </form>
    </div>
  );
}
