import React from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [editDate, setEditDate] = React.useState(todo.duedate || "");

  // Convert todo.duedate to Date object for comparison
  const dueDate = todo.duedate ? new Date(todo.duedate) : null;
  const now = new Date();

  // Helper function to check if two dates are the same calendar day
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  // Overdue if dueDate is before now and not completed
  const isOverdue = dueDate && !todo.completed && dueDate < now;
  // Today if dueDate is today (regardless of time)
  const isToday = dueDate && isSameDay(dueDate, now);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim(), editDate);
      setIsEdit(false);
    }
  };

  // Format due date and time for display
  const formatDueDateTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              type="datetime-local"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              size="sm"
              style={{ maxWidth: "180px" }}
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
            {todo.duedate && (
              <small className="text-muted" style={{ fontSize: "0.8em" }}>
                Due: {formatDueDateTime(todo.duedate)}
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
