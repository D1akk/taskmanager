import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListTask() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    axios
      .get("http://localhost:80/taskmanager/api/tasks/")
      .then(function (response) {
        //console.log(response.data);
        setTasks(response.data);
      });
  }

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:80/taskmanager/api/task/${id}/delete`)
      .then(function (response) {
        //console.log(response.data);
        getTasks();
      });
  };

  return (
    <div>
      <h1>Список задач</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, key) => (
            <tr key={key}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Link to={`task/${task.id}/edit`}>Редактировать</Link>
                <button onClick={() => deleteTask(task.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
