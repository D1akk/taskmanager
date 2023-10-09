import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import ListTask from "../src/components/ListTask";
import CreateTask from "../src/components/CreateTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <div className="App">
      <h5>Менеджер задач</h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Список задач</Link>
            </li>
            <li>
              <Link to="task/create">Добавить задачу</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListTask />} />
          <Route path="task/create" element={<CreateTask />} />
          <Route path="task/:id/edit" element={<EditTask />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
