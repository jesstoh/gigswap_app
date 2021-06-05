import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Col, Alert, Container } from 'react-bootstrap';
import { toggleProfileEdit, editProfile } from '../../slices/profileSlice';

function EditHirerProfileForm() {
  const dispatch = useDispatch();
  const initialFormValue = useSelector((state) => state.profile.profile);

  // const status = useSelector((state) => state.profile.editStatus);
  // const edit = useSelector((state) => state.profile.edit);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState(initialFormValue);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    // Delete postal code if empty value
    if (!data.postal_code) {
      data.postal_code = null
    } 
    
    delete data.user;
    delete data.id;
    try {
      const result = await dispatch(editProfile(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.detail);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    dispatch(toggleProfileEdit());
  }

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      {errorMessage && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Your Profile</h4>
        <Form.Group>
          <Form.Label>Company Name*</Form.Label>
          <Form.Control
            required
            type="text"
            name="company"
            value={formValue.company}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile Photo*</Form.Label>
          <Form.Control
          required  
            type="url"
            name="image"
            value={formValue.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formValue.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="number"
              name="postal_code"
              value={formValue.postal_code}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Country*</Form.Label>
            <Form.Control
              required
              type="text"
              name="country"
              value={formValue.country}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="tel"
              name="contact"
              value={formValue.contact}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Text className="text-muted">* Required Field</Form.Text>

        <div className="text-center mt-3">
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="primary" className="px-4" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditHirerProfileForm;
