import React from "react";
import { Button } from "antd";

function BulkAction({ listTask, onRemove }) {
  const haveDone = listTask.some((task) => task.checked);

  const handleRemove = () => {
    const listTaskId = listTask
      .filter((task) => task.checked)
      .map((task) => task.id);

    onRemove(listTaskId);
  };

  return haveDone ? (
    <div
      style={{
        backgroundColor: "rgb(224, 224, 224)",
        borderTop: "1px solid #000",
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Bulk Action:</span>

        <div>
          <Button
            onClick={handleRemove}
            style={{
              backgroundColor: "#2196f3",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              marginRight: 16,
            }}
          >
            Done
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
    </div>
  ) : null;
}

export default BulkAction;
