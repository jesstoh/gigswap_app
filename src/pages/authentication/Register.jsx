import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { register } from '../../slices/authenticationSlice';

function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  async function handleRegister(data) {
    try {
      const response = await dispatch(register(data));
      unwrapResult(response);
    } catch (err) {
      // console.log(err)
      setErrorMessage(Object.values(err.data)[0][0]);
      // console.log(errorMessage)
    }
  }

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    is_hirer: yup.bool(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
      is_hirer: false,
      // isSubmitted: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        setErrorMessage("Password doesn't match");
        // console.log(values);
      } else {
        // console.log(values);
        handleRegister(values);
      }
    },
  });

  return (
    <Container>
      <Row className="mt-5 px-3">
        <Col
          md={{ span: 6, offset: 3 }}
          className="py-4 px-4 mt-3 shadow-sm p-3 mb-3 bg-white rounded-lg border"
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
          <h3 className="text-center">Sign Up</h3>
          <Form
            onSubmit={(e) => {
              // console.log('submit');
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                minLength={6}
              />
              <span className="text-danger">
                {/* {formik.errors.username && formik.errors.username} */}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {/* {formik.errors.email && formik.errors.email} */}
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  minLength={1}
                />
                <span className="text-danger">
                  {/* {formik.errors.username && formik.errors.username} */}
                </span>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  minLength={1}
                />
                <span className="text-danger">
                  {/* {formik.errors.username && formik.errors.username} */}
                </span>
              </Form.Group>
            </Form.Row>
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
              {/* {formik.errors.password && formik.errors.password} */}
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
              {/* {formik.errors.confirmPassword && formik.errors.confirmPassword} */}
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                name="is_hirer"
                checked={formik.values.is_hirer}
                onChange={formik.handleChange}
                label="Hirer"
              />
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
