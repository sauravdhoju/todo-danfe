import React, { useState } from "react";
import { ListGroup, Button, Collapse } from "react-bootstrap";

function Sidebar({ onSelectCategory, selectedCategory, onLogout }) {
  const [open, setOpen] = useState(false);

  const mainCategories = [
    { id: "all", label: "All Tasks", icon: "bi-list-check" },
    { id: "today", label: "Today", icon: "bi-calendar-day" },
    { id: "incompleted", label: "Incompleted", icon: "bi-x-circle" },
    { id: "completed", label: "Completed", icon: "bi-check-circle" },
    { id: "overdue", label: "Overdue", icon: "bi-exclamation-circle" },
  ];

  return (
    <div
      className="p-3 bg-light min-vh-100 shadow-sm rounded"
      style={{ position: "sticky", top: "1rem" }}
    >
      <h5 className="mb-4 text-center">Task Categories</h5>

      <ListGroup>
        {mainCategories.map((cat) => (
          <ListGroup.Item
            key={cat.id}
            action
            active={selectedCategory === cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            style={{ cursor: "pointer", userSelect: "none" }}
            className="d-flex align-items-center gap-2"
          >
            <i className={`bi ${cat.icon}`}></i>
            <span>{cat.label}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr className="my-4" />
      <Button
        variant="outline-danger"
        onClick={onLogout}
        className="w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
