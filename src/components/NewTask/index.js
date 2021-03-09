import React, { useState, useEffect } from "react";
import { Input, DatePicker, Select, Button } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const DATE_FORMAT = "DD MMM YYYY";

const initialState = {
  name: "",
  description: "",
  dueDate: moment().format(DATE_FORMAT),
  priority: "normal",
};

function NewTask({ taskDetail, onAdd, onUpdate }) {
  const [task, setTask] = useState(initialState);

  useEffect(() => {
    if (taskDetail) {
      setTask({
        ...taskDetail,
      });
    }
  }, [taskDetail]);

  const handleChange = (field) => (e, val) => {
    switch (field) {
      case "name":
      case "description":
        setTask({ ...task, [field]: e.target.value });
        break;
      case "dueDate":
        setTask({ ...task, [field]: val });
        break;
      case "priority":
        setTask({ ...task, [field]: e });
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (taskDetail) {
      onUpdate(task);
    } else {
      onAdd({
        ...task,
        id: Date.now(),
      });

      setTask(initialState);
    }
  };

  const disabledDate = (date) =>
    date && moment(date).endOf("day") < moment().endOf("day");

  return (
    <div className="main">
      <Input
        placeholder="Add new task ..."
        value={task.name}
        onChange={handleChange("name")}
        style={{ marginBottom: 24 }}
      />

      <div style={{ marginBottom: 24 }}>
        <span className="font-weight-500">Description</span>
        <TextArea
          value={task.description}
          onChange={handleChange("description")}
          rows={3}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginRight: 12,
          }}
        >
          <span className="font-weight-500">Due Date</span>
          <DatePicker
            allowClear={false}
            format={DATE_FORMAT}
            disabledDate={disabledDate}
            value={moment(task.dueDate, DATE_FORMAT)}
            onChange={handleChange("dueDate")}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginLeft: 12,
          }}
        >
          <span className="font-weight-500">Priority</span>
          <Select
            value={task.priority}
            onChange={handleChange("priority")}
            style={{ width: "100%" }}
          >
            <Option value="low">Low</Option>
            <Option value="normal">Normal</Option>
            <Option value="high">High</Option>
          </Select>
        </div>
      </div>

      <Button
        block
        disabled={!task.name.trim()}
        type="primary"
        onClick={handleClick}
        style={{
          backgroundColor: "#5cb85c",
          border: "none",
          borderRadius: 6,
          color: "#fff",
        }}
      >
        {taskDetail ? "Update" : "Add"}
      </Button>
    </div>
  );
}

export default NewTask;
