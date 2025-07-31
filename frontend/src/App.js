import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import TodoItem from "./components/TodoItem";
import "bootstrap-icons/font/bootstrap-icons.css";
import ToastMessage from "./components/ToastMessage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
// import Login from "./components/Login";
// import Register from "./components/Register";
import { Offcanvas } from "react-bootstrap";

function App() {
  // const [user, setUser] = useState(localStorage.getItem("user") || "");
  // const [showRegister, setShowRegister] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchText, setSearchText] = useState("");

  // Fetch todos from API on mount
  useEffect(() => {
    axios
      .get("http://localhost:5159/api/Todo")
      .then((res) => setTodos(res.data.map(mapApiTodo)))
      .catch(() => showToast("Failed to fetch todos", "danger"));
  }, []);

  // Helper to map API todo to frontend format
  const mapApiTodo = (todo) => ({
    id: todo.id,
    text: todo.title,
    duedate: todo.dueDate?.split("T")[0] || "",
    completed: todo.isCompleted,
  });

  // Helper to map frontend todo to API format
  const mapFrontendTodo = (todo) => ({
    id: todo.id,
    title: todo.text,
    dueDate: todo.duedate,
    isCompleted: todo.completed,
  });

  const handleAdd = async () => {
    if (task.trim() === "") {
      showToast("Task cannot be blank", "danger");
      return;
    }
    if (selectedDate === "") {
      showToast("Date cannot be empty", "danger");
      return;
    }

    const newTodo = {
      title: task,
      dueDate: selectedDate,
      isCompleted: false,
    };

    try {
      const res = await axios.post("http://localhost:5159/api/Todo", newTodo);
      setTodos([mapApiTodo(res.data), ...todos]);
      showToast("Task Added");
      setTask("");
      setSelectedDate("");
    } catch (err) {
      showToast("Failed to add task", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5159/api/Todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      showToast("Task Deleted", "success");
    } catch (err) {
      showToast("Failed to delete task", "danger");
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, completed: !todo.completed };
    try {
      const res = await axios.put(
        `http://localhost:5159/api/Todo/${id}`,
        mapFrontendTodo(updated)
      );
      setTodos(
        todos.map((t) => (t.id === id ? mapApiTodo(res.data) : t))
      );
      showToast("Task Completed", "success");
    } catch (err) {
      showToast("Failed to update task", "danger");
    }
  };

  const handleUpdate = async (id, newText, newdate) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, text: newText, duedate: newdate };
    try {
      const res = await axios.put(
        `http://localhost:5159/api/Todo/${id}`,
        mapFrontendTodo(updated)
      );
      setTodos(
        todos.map((t) => (t.id === id ? mapApiTodo(res.data) : t))
      );
      showToast("Task Updated");
    } catch (err) {
      showToast("Failed to update task", "danger");
    }
  };

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const filteredTools = todos.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];
    const isOverdue = todo.duedate < today && !todo.completed;

    if (filter === "completed") return todo.completed;
    if (filter === "incompleted") return !todo.completed;
    if (filter === "today") return todo.duedate === today;
    if (filter === "overdue") return isOverdue;

    return todo.text.toLowerCase().includes(searchText.toLowerCase());
  });

  // Remove login/logout logic
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUser("");
  //   showToast("Logged out", "info");
  // };

  // Comment out login/register UI
  // if (!user) {
  //   return showRegister ? (
  //     <>
  //       <Register
  //         onRegister={(username) => {
  //           setUser(username);
  //           localStorage.setItem("user", username);
  //           setShowRegister(false);
  //         }}
  //       />
  //       <div className="text-center mt-3">
  //         <Button variant="link" onClick={() => setShowRegister(false)}>
  //           Already have an account? Login
  //         </Button>
  //       </div>
  //     </>
  //   ) : (
  //     <>
  //       <Login
  //         onLogin={(username) => {
  //           setUser(username);
  //           localStorage.setItem("user", username);
  //         }}
  //       />
  //       <div className="text-center mt-3">
  //         <Button variant="link" onClick={() => setShowRegister(true)}>
  //           Don't have an account? Register
  //         </Button>
  //       </div>
  //       <hr className="my-4" />
  //       <div className="text-center">
  //         <Button
  //           variant="outline-primary"
  //           className="d-flex align-items-center justify-content-center gap-2 mx-auto mb-2"
  //           style={{ width: "250px" }}
  //         >
  //           <img
  //             src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
  //             alt="Facebook"
  //             style={{ width: "25px", height: "25px" }}
  //           />
  //           Sign in with Facebook
  //         </Button>
  //         <span>or</span>
  //         <Button
  //           variant="outline-danger"
  //           className="d-flex align-items-center justify-content-center gap-2 mx-auto"
  //           style={{ width: "250px" }}
  //         >
  //           <img
  //             src="https://developers.google.com/identity/images/g-logo.png"
  //             alt="Google"
  //             style={{ width: "25px", height: "25px" }}
  //           />
  //           Sign in with Google
  //         </Button>
  //       </div>
  //     </>
  //   );
  // }

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
              // onLogout={handleLogout}
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
                // onLogout={handleLogout}
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
