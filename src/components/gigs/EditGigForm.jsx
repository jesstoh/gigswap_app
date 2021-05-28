import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Col, Alert, Container } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { editGig, toggleGigEdit } from '../../slices/gigsSlice.js';

function EditGigForm() {
  const dispatch = useDispatch();
  // Get all subcategories as options
  const subcategories = useSelector(
    (state) => state.categories.subcats.content
  );
  const { status, error, gig } = useSelector((state) => state.gigs.activeGig);

  const initialFormValue = { ...gig };
  initialFormValue.subcategories = initialFormValue.subcategories.map(
    (subcat) => subcat.name
  );
  initialFormValue.expired_at = format(
    parseISO(initialFormValue.expired_at),
    'yyyy-MM-dd'
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState(initialFormValue);

  const min_date = format(new Date(), 'yyyy-MM-dd');
  const duration_unit_options = ['hour', 'day', 'week', 'month'];

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    // Delete postal code if empty value
    if (!data.postal_code) {
      delete data.postal_code;
    }
    data.expired_at = new Date(data.expired_at);
    console.log(data);
    try {
      const result = await dispatch(editGig({ data, id: gig.id }));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(err);
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
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormValue({ ...formValue, [e.target.name]: values });
    // console.log(values)
  }

  return (
    <Container className="mt-4">
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
        <h4 className="text-center mb-4">Create New Gig</h4>
        <h6>Gig Info*</h6>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Gig Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={formValue.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Expired Date</Form.Label>
            <Form.Control
              type="date"
              name="expired_at"
              value={formValue.expired_at}
              required
              min={min_date}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            required
            style={{ resize: 'none' }}
            name="description"
            value={formValue.description}
            onChange={handleChange}
          />
        </Form.Group>
        <h6 className="mt-5">Gig Detail *</h6>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            as="select"
            multiple
            name="subcategories"
            value={formValue.subcategories}
            onChange={multiSelectChange}
          >
            {subcategories.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Remote </Form.Label>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="is_remote"
              value={formValue.is_remote}
              onChange={checkBoxChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project or Fixed Term </Form.Label>
            <Form.Check
              type="checkbox"
              label="Fixed Term"
              name="is_fixed"
              value={formValue.is_fixed}
              onChange={checkBoxChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Hourly Rate, $ </Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="hour_rate"
              value={formValue.hour_rate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Budget </Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="fixed_amount"
              value={formValue.fixed_amount}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Duration </Form.Label>
            <Form.Control
              type="number"
              required
              min="1"
              name="duration"
              value={formValue.duration}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Unit</Form.Label>
            <Form.Control
              as="select"
              name="duration_unit"
              value={formValue.duration_unit}
              required
              onChange={handleChange}
            >
              {duration_unit_options.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <h6 className="mt-5">Gig Location</h6>
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

export default EditGigForm;