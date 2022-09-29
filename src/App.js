import { useState } from "react";
import "./styles.css";

import Navbar from "./components/navbar/Navbar";
import TaskList from "./components/tasklist/TaskList";

let idAcc = 0;

const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTastks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };

    setTastks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTastks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      }); //existingTasks.map
    }); //setTastks
  };

  const deleteTask = (id) => {
    setTastks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <h1>Xavier</h1>
      <Navbar />
      <div className="container">
        <TaskList
          title="Pedente"
          taskState="Pendente"
          onAddTask={addTask}
          tasks={tasks.filter((task) => task.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          taskState="Fazendo"
          onAddTask={addTask}
          tasks={tasks.filter((task) => task.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          taskState="Completa"
          onAddTask={addTask}
          tasks={tasks.filter((task) => task.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
