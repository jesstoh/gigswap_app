import React from 'react';
import { Carousel } from 'react-bootstrap';

function LandingPage() {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
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
          className="d-block w-100"
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
          className="d-block w-100"
          src="https://i.imgur.com/hCSHF47.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Find right match</h3>
          <p>Right talent right time</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LandingPage;
