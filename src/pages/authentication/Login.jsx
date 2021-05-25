import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../../slices/authenticationSlice';

function Login() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  //Function to dispatch and set error message
  async function handleLogin(data) {
    try {
      const response = await dispatch(login(data));
      unwrapResult(response);
    } catch (err) {
      setErrorMessage(err.data.details);
    }
  }

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      isSubmitted: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <Container>
      <Row className="mt-5">
        <Col
          md={{ span: 6, offset: 3 }}
          className="py-4 px-4 shadow-sm p-3 mb-5 bg-white rounded-lg border"
        >
          {errorMessage && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}
          <h3 className="text-center">Login</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required={true}
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                minLength={6}
              />
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
                minLength={6}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              Not a member yet? <a href="/register">Sign Up now</a>
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

export default Login;
