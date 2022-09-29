import "./taskitem.css";

import { useState } from "react";
import PropTypes from "prop-types";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [EditableTile, setEditableTile] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTile(newTitle);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        onDeleteTask(id);
      } else {
        onTaskUpdate(id, EditableTile, taskState);
      }

      setIsEditing(false);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const onBlur = (event) => {
    setIsEditing(false);
  };

  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <label>
          {id} - {title}
        </label>
        <br />
        <label>alterar para:</label>
        <br />

        <input
          id="edit-task"
          autoFocus
          type="text"
          value={EditableTile}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          ref={(input) => {
            this.nameInput = input;
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div
          onClick={(e) => {
            setIsEditing(true);
          }}
        >
          {id} - {EditableTile}
        </div>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};
