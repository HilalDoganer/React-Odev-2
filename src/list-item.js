import React from "react";

export function ListItem({
  todo,
  completed,
  onToggle,
  index,
  onRemove,
  isVisible,
}) {
  if (isVisible)
    return (
      <li className={completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(index)}
          />
          <label>{todo}</label>
          <button className="destroy" onClick={() => onRemove(index)}></button>
        </div>
      </li>
    );
}
