import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { createProfile } from '../../slices/profileSlice.js';
import { setProfileComplete } from '../../slices/authenticationSlice';

function CreateHirerProfileForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.profile.editStatus);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState({
    company: '',
    bio: '',
    image: '',
    address: '',
    postal_code: '',
    country: '',
    contact: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    // Delete postal code if empty value
    if (!data.postal_code) {
      data.postal_code = null
    }
    try {
      const result = await dispatch(createProfile(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.detail);
    }
  }

  useEffect(() => {
    // If profile created successfully, set isProfileComplete to true, so page will render profile detail instead
    if (status === 'succeeded') {
      dispatch(setProfileComplete());
    }
  }, [status]);

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  return (
    <div>
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
          <Form.Label>Bio*</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            style={{ resize: 'none' }}
            name="bio"
            value={formValue.bio}
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
          <Button variant="primary" className="px-4" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateHirerProfileForm;
