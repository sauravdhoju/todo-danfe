import  { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import TodoItem from "./components/TodoItem";
import "bootstrap-icons/font/bootstrap-icons.css";
import ToastMessage from "./components/ToastMessage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import { Offcanvas } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [showRegister, setShowRegister] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    if (!user) return [];
    const savedTodos = localStorage.getItem(`todos_${user}`);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const handleAdd = () => {
    if (task.trim() === "") {
      showToast("Task cannot be blank", "danger");
      return;
    }

    if (selectedDate === "") {
      showToast("Date cannot be empty", "danger");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
      dueDate: selectedDate,
    };

    setTodos([newTodo, ...todos]);
    showToast("Task Added");
    setTask("");
    setSelectedDate("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showToast("Task Deleted", "success");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showToast("Task Completed", "success");
  };

  const handleUpdate = (id, newText, newdate) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, dueDate: newdate } : todo
      )
    );
    showToast("Task Updated");
  };

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const filteredTools = todos.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];

    const isOverdue = todo.dueDate < today && !todo.completed;

    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    if (filter === "today") return todo.dueDate === today;
    if (filter === "overdue") return isOverdue;

    return todo.text.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
    // setTodos([]);
    showToast("Logged out", "info");
  };

  if (!user) {
    return showRegister ? (
      <>
        <Register
          onRegister={(username) => {
            setUser(username);
            localStorage.setItem("user", username);
            setShowRegister(false);
          }}
        />
        <div className="text-center mt-3">
          <Button variant="link" onClick={() => setShowRegister(false)}>
            Already have an account? Login
          </Button>
        </div>
      </>
    ) : (
      <>
        <Login
          onLogin={(username) => {
            setUser(username);
            localStorage.setItem("user", username);
          }}
        />
        <div className="text-center mt-3">
          <Button variant="link" onClick={() => setShowRegister(true)}>
            Don't have an account? Register
          </Button>
        </div>

        <hr className="my-4" />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container fluid className="mt-3">
        <Row className="flex-nowrap">
          <Col
            md={3}
            lg={2}
            className="d-none d-md-block bg-light p-0"
            style={{ minHeight: "100vh" }}
          >
            <Sidebar
              onSelectCategory={setFilter}
              selectedCategory={filter}
              onLogout={handleLogout}
            />
          </Col>

          <Offcanvas
            show={showSidebar}
            onHide={() => setShowSidebar(false)}
            className="d-md-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar
                onSelectCategory={(cat) => {
                  setFilter(cat);
                  setShowSidebar(false);
                }}
                selectedCategory={filter}
                onLogout={handleLogout}
              />
            </Offcanvas.Body>
          </Offcanvas>

          <Col xs={12} md={9} lg={10} className="px-4">
            <div className="d-md-none d-flex justify-content-between align-items-center mb-3">
              <Button
                variant="outline-primary"
                onClick={() => setShowSidebar(true)}
              >
                <i className="bi bi-list"></i>
              </Button>
              <h5 className="mb-0 text-center w-100">Simple To-Do List</h5>
            </div>

            <h3 className="text-center d-none d-md-block mb-4">
              Simple To-Do List
            </h3>

            {/* Task Form */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <Form.Group className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                <Form.Control
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter a task..."
                  className="flex-grow-1"
                  style={{ flexBasis: "60%", minWidth: "150px" }}
                />
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-shrink-0"
                  style={{ flexBasis: "15%", minWidth: "100px" }}
                />

                <Button
                  variant="primary"
                  type="submit"
                  className="flex-shrink-0"
                >
                  <i className="bi bi-plus-circle-dotted"></i>
                </Button>

                <div className="d-md-none">
                  <Button
                    variant="info"
                    onClick={() => setShowSearch(!showSearch)}
                    className="flex-shrink-0"
                  >
                    <i className="bi bi-search-heart-fill"></i>
                  </Button>
                </div>

                {(showSearch || window.innerWidth >= 768) && (
                  <Form.Control
                    type="text"
                    placeholder="Search tasks..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-grow-1 mt-2 mt-md-0"
                    style={{ flexBasis: "100%", minWidth: "100px" }}
                  />
                )}
              </Form.Group>
            </Form>

            <ListGroup className="mt-4">
              {filteredTools.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDelete}
                  onToggle={toggleComplete}
                  onUpdate={handleUpdate}
                />
              ))}
            </ListGroup>

            <ToastMessage
              show={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
              message={toast.message}
              variant={toast.variant}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default App;
