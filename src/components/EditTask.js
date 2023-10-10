import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListTask() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getTask();
  }, []);

  function getTask() {
    axios
      .get(`http://localhost:80/taskmanager/api/task/${id}`)
      .then(function (response) {
        //console.log(response.data);
        setInputs(response.data);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:80/taskmanager/api/task/${id}/edit`, inputs)
      .then(function (response) {
        //console.log(response.data);
        navigate("/");
      });
  };
  return (
    <div>
      <h1>Редактировать задачу</h1>
      <form onSubmit={handleSubmit}>
        <label>Название: </label>
        <input value={inputs.title} type="text" name="title" onChange={handleChange}></input>
        <br />
        <label>Описание: </label>
        <input value={inputs.description} type="text" name="description" onChange={handleChange}></input>
        <br />
        <button>Изменить</button>
      </form>
    </div>
  );
}
