import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Collapse, Form, Col } from 'react-bootstrap';
import { createHirerReview } from '../../slices/favouritesSlicer.js';

function ReviewHirerContainer() {
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Show review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formValue, setFormValue] = useState({
    rating: 5,
    payment_ontime: false,
    scope: 5,
    description: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
  }
  function checkBoxChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
  }
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function checkBoxChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
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
          <Form onSubmit={handleSubmit}>
            <h5 className="text-center mb-3">Review Hirer</h5>
            <p className='text-left text-muted mb-4'><i>Think about this gig when leaving the review</i></p>

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
                required
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
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Cancel
              </Button>
              <Button variant="primary rounded-pill" className="mr-3 px-4 ">
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
