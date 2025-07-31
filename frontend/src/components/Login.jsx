import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";

function Login({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (
        users[values.username] &&
        users[values.username].password === values.password
      ) {
        onLogin(values.username);
      } else {
        alert("Invalid username or password");
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Login</h2>

          <Form noValidate onSubmit={formik.handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              Login
            </Button>
          </Form>


        </Col>
      </Row>
    </Container>
  );
}

export default Login;
