import React, { useState } from "react";
import { Input } from "antd";
import Task from "../Task";

function ListTask({ listTask, onUpdate, onRemove, onChecked }) {
  const [search, setSearch] = useState("");

  return listTask.length > 0 ? (
    <div>
      <Input
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {listTask
        .filter((task) => task.name.includes(search))
        .map((task, index) => (
          <Task
            key={index}
            task={task}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onChecked={onChecked}
          />
        ))}
    </div>
  ) : null;
}

export default ListTask;
