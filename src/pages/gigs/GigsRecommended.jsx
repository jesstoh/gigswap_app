import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchRecommendedGigs } from '../../slices/gigsSlice.js';

function GigsRecommended() {
  const dispatch = useDispatch();

  //current active page
  const [activePage, setActivePage] = useState(1);
  const { gigs, pageCount } = useSelector((state) => state.gigs); // To change to the one from api

  function handlePageChange(e) {
    setActivePage(Number(e.target.id));
    const pageUrl = '?page=' + e.target.id;
    dispatch(fetchRecommendedGigs(pageUrl));
    // console.log(urlQuery + '&page=' + e.target.id);
  }

  useEffect(() => {
    dispatch(fetchRecommendedGigs());
  }, []);

  let paginationFooter;
  if (gigs.length || pageCount > 1) {
    paginationFooter = (
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pl-5">
          <Pagination>
            {new Array(pageCount).fill(0).map((el, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === activePage}
                id={index + 1}
                onClick={handlePageChange}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    );
  }

  return (
    <Container className="pt-3">
      <h4 className="text-center">Gigs Recommended for You</h4>
      {/* <Row className='border my-3'>Placeholder for search </Row> */}
      <Row>
        {/* <Col md={3} className='border'> </Col> */}
        <Col md={{ span: 8, offset: 2 }}>
          <GigsList />
        </Col>
      </Row>
      {paginationFooter}
    </Container>
  );
}

export default GigsRecommended;
