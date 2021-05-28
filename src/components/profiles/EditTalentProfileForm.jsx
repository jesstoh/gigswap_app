import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Col, Alert, Container } from 'react-bootstrap';
import { setProfileComplete } from '../../slices/authenticationSlice';
import { toggleProfileEdit, editProfile } from '../../slices/profileSlice';

function EditTalentProfileForm() {
  const dispatch = useDispatch();
  // Get all subcategories as option to multi-select for skills of talent
  const subcategories = useSelector(
    (state) => state.categories.subcats.content
  );
  const initialFormValue = useSelector((state) => state.profile.profile);
  const skillOptions = [ ...subcategories ].map((subcat) => (
    <option key={subcat.id} value={subcat.id}>
      {subcat.name}
    </option>
  ));

  const status = useSelector((state) => state.profile.editStatus);
  const edit = useSelector((state) => state.profile.edit);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState(initialFormValue);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    // Delete postal code if empty value
    if (!data.postal_code) {
      delete data.postal_code;
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

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function checkBoxChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
  }

  function multiSelectChange(e) {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      // console.log(options[i], options[i].selected)
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormValue({ ...formValue, [e.target.name]: values });
  }

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

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
        <h6>About You*</h6>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
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
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control
            type="url"
            required
            name="image"
            value={formValue.image}
            onChange={handleChange}
          />
        </Form.Group>
        <h6 className="mt-5">Preference *</h6>
        <Form.Group>
          <Form.Label>Skill</Form.Label>
          <Form.Control
            required
            as="select"
            multiple
            name="skills"
            value={formValue.skills}
            onChange={multiSelectChange}
          >
            {skillOptions}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Min Pay, $ / hr </Form.Label>
          <Form.Control
            type="number"
            required
            min="1"
            name="min_pay"
            value={formValue.min_pay}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Preferred Remote Only </Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="remote"
              value={formValue.remote}
              onChange={checkBoxChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Preferred Term Based Gig </Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="fixed_term"
              value={formValue.fixed_term}
              onChange={checkBoxChange}
            />
          </Form.Group>
        </Form.Row>

        <h6 className="mt-4">Contact Details</h6>
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
            <Form.Label>Country</Form.Label>
            <Form.Control
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
    </Container>
  );
}

export default EditTalentProfileForm;
