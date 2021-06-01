import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Collapse, Form, Col, Alert } from 'react-bootstrap';
import { createHirerReview } from '../../slices/gigsSlice.js';

function ReviewHirerContainer() {
  const dispatch = useDispatch();
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Show review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const initialFormState = {
    rating: 5,
    payment_ontime: false,
    scope: 5,
    description: '',
  };
  const [formValue, setFormValue] = useState({ ...initialFormState });
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    // set gig id in post data
    data.gig_id = gig.id;
    try {
      const result = await dispatch(createHirerReview(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.detail);
    }
  }
  function checkBoxChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
  }
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormValue({ ...initialFormState });
    setShowReviewForm(!showReviewForm);
  }

  return (
    <>
      {showReviewForm ? null : (
        <Button
          variant="primary"
          className="rounded-pill mt-3 px-4"
          aria-controls="gigs-container"
          onClick={() => {
            setShowReviewForm(!showReviewForm);
          }}
        >
          Leave a review for hirer
        </Button>
      )}

      <Collapse in={showReviewForm}>
        <div id="gigs-container" className="mt-5 border rounded p-3">
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
            <h5 className="text-center mb-3">Review Hirer</h5>
            <p className="text-left text-muted mb-4">
              <i>Think about this gig when leaving the review</i>
            </p>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Overall Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  required
                  name="rating"
                  value={formValue.rating}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Scope Clarity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  required
                  name="scope"
                  value={formValue.scope}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Payment on Time </Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  name="payment_ontime"
                  value={formValue.payment_ontime}
                  onChange={checkBoxChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Review details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: 'none' }}
                name="description"
                max="500"
                value={formValue.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Text className="text-muted text-right">
              Max 500 characters
            </Form.Text>

            <div className="text-center mt-3">
              <Button
                variant="light rounded-pill"
                className="mr-3 px-4 "
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary rounded-pill"
                className="mr-3 px-4 "
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Collapse>
    </>
  );
}

export default ReviewHirerContainer;
