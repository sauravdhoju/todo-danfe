import { Toast, ToastContainer } from "react-bootstrap";

function ToastMessage({ show, onClose, message, variant = "success" }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={2500} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">
            {variant === "danger" ? "Error" : "Success"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
