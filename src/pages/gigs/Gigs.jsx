import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchGigs } from '../../slices/gigsSlice.js';
// import SearchGigs from '../../components/gigs/SearchGigs';

function Gigs() {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [formValue, setFormValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function handleSubmitSearch(e) {
    e.preventDefault();
    console.log(searchValue);
  }

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  const searchContainer = (
    <Container className='px-5 my-3' >
      <Row >
        <Col xs='9' sm={{ span: 8, offset: 3 }}>
          <Form.Control
            // className="rounded-pill"
            type="text"
            name="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs='2' sm="1">
          <Button
            // variant="primary rounded-pill"
            className=" px-2 "
            type="submit"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Container className="pt-3">
      {searchContainer}
      <Row>
        <Col md={3} className="border">
          Placeholder for filter{' '}
        </Col>
        <Col md={9}>
          <GigsList />
        </Col>
      </Row>
    </Container>
  );
}

export default Gigs;
