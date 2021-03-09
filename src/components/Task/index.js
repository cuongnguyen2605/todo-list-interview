import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import NewTask from "../NewTask";

function Task({ task, onUpdate, onRemove, onChecked }) {
  const [show, setShow] = useState(false);

  const handleChecked = (e) => onChecked(task.id, e.target.checked);

  const handleShowDetail = () => setShow(!show);

  const handleRemove = () => onRemove([task.id]);

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          border: "1px solid #d9d9d9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <div>
          <Checkbox
            checked={task.checked}
            onChange={handleChecked}
            style={{ marginRight: 8 }}
          >
            {task.name}
          </Checkbox>
        </div>

        <div>
          <Button
            onClick={handleShowDetail}
            style={{
              backgroundColor: "#02bcd4",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              marginRight: 8,
            }}
          >
            Detail
          </Button>

          <Button
            onClick={handleRemove}
            style={{
              backgroundColor: "#d95350",
              border: "none",
              borderRadius: 6,
              color: "#fff",
            }}
          >
            Remove
          </Button>
        </div>
      </div>

      {show && (
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderTop: "none",
            padding: 16,
          }}
        >
          <NewTask taskDetail={task} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
}

export default Task;
