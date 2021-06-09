import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';

function LandingPage() {
  return (
    <>
      <div className="slide-container">
        <Carousel controls={false} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-image"
              src="https://i.imgur.com/xmK7rXj.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Global network</h3>
              <p>Connect thousands of talents with gigs</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-image"
              src="https://i.imgur.com/bJ9koDx.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Work anywhere</h3>
              <p>Remote or physical your choice</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slide-image"
              src="https://i.imgur.com/hCSHF47.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Find right match</h3>
              <p>Right talent right time</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <Row className='mt-3'>
        <Col sm='4' className="px-5 py-2">
          <p className="text-primary">
            <i>"Review feature lets me efficiently find the right talent for the role"</i>
          </p>
          <p className="text-right" style={{margin:'0'}}>Space Xplore</p>
        </Col>
        <Col sm='4' className="px-5 py-2">
          <p className="text-primary">
            <i>"With portfolio building up and good reviews, I am able to get more gigs over the time"</i>
          </p>
          <p className="text-right" style={{margin:'0'}}>Kennings</p>
          <span className="text-right text-muted d-block">Software Developer</span>
    
        </Col>
        <Col sm='4' className="px-5 py-2">
          <p className="text-primary">
            <i>"Opportunity of remote work and short term project allow me to focus on what I am passionate of doing"</i>
          </p>
          <p className="text-right" style={{margin:'0'}}>James Tan</p>
          <span className="text-right text-muted d-block">UI Designer</span>
        </Col>
      </Row>
    </>
  );
}

export default LandingPage;
