import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Tab, Row, Col, Nav } from 'react-bootstrap';
import { fetchHirerFav } from '../../slices/favouritesSlicer.js';
import {fetchMyReviews} from '../../slices/reviewsSlice.js'
import HirerFavGigsList from '../../components/hirers/HirerFavGigsList';
import HirerFavTalentsList from '../../components/hirers/HirerFavTalentsList';
import HirerFavReviewsList from '../../components/hirers/HirerFavReviewsList'

function HirerFavPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(fetchHirerFav());
    dispatch(fetchMyReviews());
  }, []);

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {

    content = (
      <Tab.Container id="hirer-fav" defaultActiveKey="my-gigs">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="my-gigs">My Gigs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="my-talents">Fav Talents</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="my-reviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="my-gigs">
                <HirerFavGigsList />
              </Tab.Pane>
              <Tab.Pane eventKey="my-talents">
                <HirerFavTalentsList />
              </Tab.Pane>
              <Tab.Pane eventKey="my-reviews">
                <HirerFavReviewsList />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className="mt-5">{content}</Container>;
}

export default HirerFavPage;
