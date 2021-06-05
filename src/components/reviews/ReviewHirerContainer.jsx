import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Collapse, Form, Col, Alert } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createHirerReview } from '../../slices/gigsSlice.js';

function ReviewHirerContainer() {
  const dispatch = useDispatch();
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Show review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const initialFormState = {
    // rating: 5,
    payment_ontime: false,
    // scope: 5,
    description: '',
  };
  const [formValue, setFormValue] = useState({ ...initialFormState });
  const [errorMessage, setErrorMessage] = useState(null);
  const [rating, setRating] = useState(5); // Store rating value with stars
  const [scope, setScope] = useState(5); // Store scope value with stars

  // Handle change by clicking on star of rating
  function handleRatingChange(e) {
    setRating(Number(e.currentTarget.id));
  }

  // Handle change by clicking on star of rating
  function handleScopeChange(e) {
    setScope(Number(e.currentTarget.id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    data.rating = rating;
    data.scope = scope;
    // set gig id in post data
    data.gig_id = gig.id;
    // console.log(data)
    try {
      const result = await dispatch(createHirerReview(data));
      unwrapResult(result);
    } catch (err) {
      // console.log(err);
      setErrorMessage(err.data.detail);
    }
  }

  function checkBoxChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
  }
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  //Clear and hide form
  function handleCancel(e) {
    e.preventDefault();
    setFormValue({ ...initialFormState });
    setRating(5);
    setScope(5);
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
                <div>
                  {[1, 2, 3, 4, 5].map((ele) => {
                    return ele <= rating ? (
                      <span key={ele} id={ele} onClick={handleRatingChange}>
                        <FaStar className="text-warning link-like" />
                      </span>
                    ) : (
                      <span key={ele} id={ele} onClick={handleRatingChange}>
                        <FaRegStar className="text-warning link-like" />
                      </span>
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Scope Clarity</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((ele) => {
                    return ele <= scope ? (
                      <span key={ele} id={ele} onClick={handleScopeChange}>
                        <FaStar className="text-warning link-like" />
                      </span>
                    ) : (
                      <span key={ele} id={ele} onClick={handleScopeChange}>
                        <FaRegStar className="text-warning link-like" />
                      </span>
                    );
                  })}
                </div>
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
