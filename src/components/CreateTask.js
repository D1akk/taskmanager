import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:80/taskmanager/api/task/save", inputs)
      .then(function (response) {
        //console.log(response.data);
        navigate("/");
      });
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
        <button>Создать</button>
      </form>
    </div>
  );
}
