import React from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [editDate, setEditDate] = React.useState(todo.dueDate || "");

  // Convert todo.dueDate to Date object for comparison
  const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
  const today = new Date();

  // Helper function to check if two dates are the same calendar day
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const isOverdue = dueDate && !todo.completed && dueDate < today && !isSameDay(dueDate, today);
  const isToday = dueDate && isSameDay(dueDate, today);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim(), editDate);
      setIsEdit(false);
    }
  };

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      variant={todo.completed ? "success" : ""}
    >
      <div className="d-flex align-items-center" style={{ flex: 1, gap: '8px' }}>
        <i
          className={`bi ${todo.completed ? "bi-check-circle-fill" : "bi-circle"} me-2`}
          style={{ cursor: "pointer" }}
          onClick={() => onToggle(todo.id)}
        ></i>

        {isEdit ? (
          <>
            <FormControl
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              size="sm"
              autoFocus
            />
            <FormControl
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              size="sm"
              style={{ maxWidth: "160px" }}
              autoFocus
            />
          </>
        ) : (
          <div
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              color: isToday ? "green" : isOverdue ? "red" : "inherit",
              fontWeight: isToday || isOverdue ? "600" : "normal",
            }}
            onClick={() => onToggle(todo.id)}
          >
            <span>{todo.text}</span>
            {todo.dueDate && (
              <small className="text-muted" style={{ fontSize: "0.8em" }}>
                Due: {todo.dueDate}
              </small>
            )}
          </div>
        )}
      </div>

      {isEdit ? (
        <Button variant="success" size="sm" className="me-2" onClick={handleSave}>
          <i className="bi bi-check-lg"></i>
        </Button>
      ) : (
        <Button
          variant="warning"
          size="sm"
          className="me-2"
          onClick={() => setIsEdit(true)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
      )}

      <Button variant="danger" size="sm" onClick={() => onDelete(todo.id)}>
        <i className="bi bi-trash3"></i>
      </Button>
    </ListGroup.Item>
  );
}


export default TodoItem;
