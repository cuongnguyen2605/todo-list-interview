import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask";
import ListTask from "./components/ListTodo";
import BulkAction from "./components/BulkAction";

const localStorageKey = "todo-list";

function App() {
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    let todoList;

    try {
      todoList = JSON.parse(localStorage.getItem(localStorageKey));
    } catch (error) {
      todoList = null;
    }

    if (todoList) {
      setListTask(todoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(listTask));
  }, [listTask]);

  const onAdd = (task) => {
    if (task) {
      setListTask([task, ...listTask]);
    }
  };

  const onUpdate = (task) => {
    const newListTask = listTask.map((t) => {
      if (t.id === task.id) return task;
      return t;
    });

    setListTask(newListTask);
  };

  const onRemove = (listId) => {
    const newListTask = listTask.filter((t) => !listId.includes(t.id));

    setListTask(newListTask);
  };

  const onChecked = (id, checked) => {
    const newListTask = listTask.map((t) => {
      if (t.id === id) return { ...t, checked };
      return t;
    });

    setListTask(newListTask);
  };

  return (
    <div style={{ height: "100vh", padding: 16 }}>
      <div
        style={{
          border: "1px solid",
          display: "flex",
          height: "100%",
        }}
      >
        <div style={{ padding: 16, width: "40%" }}>
          <div style={{ textAlign: "center" }}>
            <h2>New Task</h2>
          </div>

          <NewTask onAdd={onAdd} />
        </div>

        <div style={{ borderRight: "1px solid" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 0,
            width: "60%",
          }}
        >
          <div style={{ padding: 16, overflow: "auto", height: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <h2>Todo List</h2>
            </div>

            <ListTask
              listTask={listTask}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onChecked={onChecked}
            />
          </div>

          <BulkAction listTask={listTask} onRemove={onRemove} />
        </div>
      </div>
    </div>
  );
}

export default App;
