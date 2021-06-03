import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner, Tab, Nav } from 'react-bootstrap';
import { fetchTalentFav } from '../../slices/favouritesSlicer.js';
import { fetchMyReviews } from '../../slices/reviewsSlice';
import TalentFavList from '../../components/talents/TalentFavList';
import TalentFavReviewsList from '../../components/talents/TalentFavReviewsList';

function TalentFavPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(fetchTalentFav());
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
      <Tab.Container id="talent-fav" defaultActiveKey="my-gigs">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="my-gigs">My Gigs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="my-reviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="my-gigs">
                <TalentFavList />
              </Tab.Pane>
              <Tab.Pane eventKey="my-reviews">
                <TalentFavReviewsList />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
    // content = <TalentFavList />;
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className="mt-5">{content}</Container>;
}

export default TalentFavPage;
