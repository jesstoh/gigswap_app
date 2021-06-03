import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Collapse, Form, Col, Alert } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createTalentReview } from '../../slices/gigsSlice.js';

function ReviewTalentContainer() {
  const dispatch = useDispatch();
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Show review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const initialFormState = {
    // rating: 5,
    // quality: 5,
    is_ontime: true,
    recommended: true,
    description: '',
  };
  const [rating, setRating] = useState(5); // Store rating value with stars
  const [quality, setQuality] = useState(5); // Store quality value with stars
  const [formValue, setFormValue] = useState({ ...initialFormState });
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle change by clicking on star of rating
  function handleRatingChange(e) {
    // console.log(e.target)
    // console.log(e.currentTarget.id)
    setRating(Number(e.currentTarget.id));
  }

  // Handle change by clicking on star of quality
  function handleQualityChange(e) {
    // console.log(e.target)
    // console.log(e.currentTarget.id)
    setQuality(Number(e.currentTarget.id));
  }

  // Post to backend when clicking submit button
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formValue };
    data.rating = rating;
    data.quality = quality;
    // set gig id in post data
    data.gig_id = gig.id;
    // console.log(data);
    try {
      const result = await dispatch(createTalentReview(data));
      // console.log(result);
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

  // Clearing and hide form for cancel button
  function handleCancel(e) {
    e.preventDefault();
    setFormValue({ ...initialFormState });
    setRating(5);
    setQuality(5);
    setShowReviewForm(!showReviewForm);
  }

  // Testing purpose
  // useEffect(() => {
  //   console.log(rating)
  // }, [rating]);

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
        <div id="gigs-container" className="mt-5 border rounded py-3 px-4">
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
            <p className="text-left text-muted mb-4 text-smaller">
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
                <Form.Label>Quality of Work</Form.Label>
                <div>
                  {[1, 2, 3, 4, 5].map((ele) => {
                    return ele <= quality ? (
                      <span key={ele} id={ele} onClick={handleQualityChange}>
                        <FaStar className="text-warning link-like" />
                      </span>
                    ) : (
                      <span key={ele} id={ele} onClick={handleQualityChange}>
                        <FaRegStar className="text-warning link-like" />
                      </span>
                    );
                  })}
                </div>
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
                <Form.Label>Recommend?</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  name="recommended"
                  value={formValue.recommended}
                  onChange={checkBoxChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group className='text-left mt-3'>
              <Form.Label>Details</Form.Label>
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
