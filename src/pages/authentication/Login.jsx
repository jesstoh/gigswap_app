import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../../slices/authenticationSlice';

function Login() {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  // const [error, setError] = useState({})

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await dispatch(login(formValue));
      unwrapResult(result);
      
    } catch (err) {
      setFormValue({ username: '', password: '' });
      console.log(err);
    }
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col
          md={{ span: 6, offset: 3 }}
          className="py-4 px-4 shadow-sm p-3 mb-5 bg-white rounded-lg border"
        >
          <h3 className="text-center">Login</h3>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required={true}
                type="text"
                placeholder="Enter email"
                id="username"
                value={formValue.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                id="password"
                value={formValue.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              Not a member yet? <a href="/register">Sign Up now</a>
            </Form.Text>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
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
