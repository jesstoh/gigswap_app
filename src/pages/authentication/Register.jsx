import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Register() {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isSubmitted: false,
      error: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        values.error = "Password doesn't match";
        console.log(values)
      } else {
        console.log('ok');
      }
    },
  });

  return (
    <Container>
      <Row className="mt-5">
        <Col
          md={{ span: 6, offset: 3 }}
          className="py-4 px-4 shadow-sm p-3 mb-5 bg-white rounded-lg border"
        >
          <h3 className="text-center">Sign Up</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.errors.username}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.errors.email}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.errors.password}
            </Form.Group>
            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword && formik.errors.confirmPassword}
            </Form.Group>
            <Form.Text className="text-muted">
              Already have an account? <a href="/login">Login here</a>
            </Form.Text>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
