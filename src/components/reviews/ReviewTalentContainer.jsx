import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Collapse, Form, Col, Alert } from 'react-bootstrap';
import { createTalentReview } from '../../slices/gigsSlice.js';

function ReviewTalentContainer() {
  const dispatch = useDispatch();
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Show review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const initialFormState = {
    rating: 5,
    quality: 5,
    is_ontime: true,
    recommended: true,
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
      const result = await dispatch(createTalentReview(data));
      console.log(result);
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
          Review Talent's Performance
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
            <h5 className="text-center mb-3">Review Talent</h5>
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
                <Form.Label>Quality of Work</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  required
                  name="quality"
                  value={formValue.quality}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Delivery On Time </Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  name="is_ontime"
                  value={formValue.is_ontime}
                  onChange={checkBoxChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Worthy of Recommending</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  name="recommended"
                  value={formValue.recommended}
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

export default ReviewTalentContainer;
