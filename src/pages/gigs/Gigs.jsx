import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchGigs } from '../../slices/gigsSlice.js';
// import SearchGigs from '../../components/gigs/SearchGigs';

function Gigs() {
  const dispatch = useDispatch();
  // Get all subcategories as options
  const subcategories = useSelector(
    (state) => state.categories.subcats.content
  );

  //Store value typed in search bar
  const [searchValue, setSearchValue] = useState('');
  //Store value in filter section
  const [filterValue, setFilterValue] = useState({
    subcategories: [],
    is_remote: false,
    is_fixed: false,
    hour_rate: 35,
  });

  //current active page
  const [activePage, setActivePage] = useState(1);
  const pageCount = useSelector((state) => state.gigs.pageCount); // To change to the one from api

  // Store current url query
  const [urlQuery, setUrlQuery] = useState('?');

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleFilterChange(e) {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  }

  function checkBoxChange(e) {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.checked });
  }

  function multiSelectChange(e) {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFilterValue({ ...filterValue, [e.target.name]: values });
    // console.log(values)
  }

  function handlePageChange(e) {
    setActivePage(Number(e.target.id));
    console.log(urlQuery + '&page=' + e.target.id);
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log(searchValue);
    //Set it into current url query
    const searchUrl = `?search=${searchValue}`;
    setUrlQuery(searchUrl); //Set current url query
    dispatch(fetchGigs(searchUrl)); //Fetching gigs with search params
    setActivePage(1); //Reset page
  }

  function handleFilter(e) {
    e.preventDefault();
    console.log(filterValue);
    const filterUrl = `?filter=true&is_fixed=${
      filterValue.is_fixed
    }&is_remote=${filterValue.is_remote}&subcategories=${JSON.stringify(
      filterValue.subcategories
    )}&hour_rate=${filterValue.hour_rate}`;
    setUrlQuery(filterUrl); //Set current url query
    dispatch(fetchGigs(filterUrl)); //Fetching gigs with filter params
    setActivePage(1); //reset page count
  }

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  // Testing purpose
  // useEffect(() => {
  //   console.log(urlQuery);
  // }, [urlQuery]);

  const searchContainer = (
    <Container className="px-5 my-3">
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs="9" sm={{ span: 8, offset: 3 }}>
            <Form.Control
              // className="rounded-pill"
              type="text"
              name="search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs="2" sm="1">
            <Button
              // variant="primary rounded-pill"
              className=" px-2 "
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );

  const filterContainer = (
    <>
      <Form onSubmit={handleFilter}>
        <h5 className="text-center">Filter</h5>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Control
            // required
            as="select"
            multiple
            name="subcategories"
            value={filterValue.subcategories}
            onChange={multiSelectChange}
          >
            {subcategories.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Remote Only"
            name="is_remote"
            value={filterValue.is_remote}
            onChange={checkBoxChange}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          {/* <Form.Label>Project or Fixed Term </Form.Label> */}
          <Form.Check
            type="checkbox"
            label="Fixed Term"
            name="is_fixed"
            value={filterValue.is_fixed}
            onChange={checkBoxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Min Hourly Rate</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="500"
            name="hour_rate"
            value={filterValue.hour_rate}
            onChange={handleFilterChange}
          />
          <Form.Text>$ {filterValue.hour_rate}</Form.Text>
        </Form.Group>

        {/* <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Duration </Form.Label>
            <Form.Control
              type="number"
              required
              min="1"
              name="duration"
              value={filterValue.duration}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Unit</Form.Label>
            <Form.Control
              as="select"
              name="duration_unit"
              value={formValue.duration_unit}
              required
              onChange={handleChange}
            >
              d
            </Form.Control>
          </Form.Group>
        </Form.Row> */}
        {/* 
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formValue.country}
              onChange={handleChange}
            />
          </Form.Group> */}

        {/* <Form.Text className="text-muted">
          Some fields is mutually exclusive
        </Form.Text> */}

        <div className="text-center ">
          <Button variant="primary" className="px-3 mt-3 mr-2" type="submit">
            Filter
          </Button>
          <Button variant="outline-secondary" className="px-3 mr-2 mt-3">
            Clear
          </Button>
        </div>
      </Form>
    </>
  );

  return (
    <Container className="pt-3">
      {searchContainer}
      <Row>
        <Col
          md={3}
          className="border rounded mt-5 p-3 pb-5"
          style={{ height: 'fit-content' }}
        >
          {filterContainer}
        </Col>
        <Col md={9} className="pl-4">
          <GigsList />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 9, offset: 3 }} className="pl-5">
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
    </Container>
  );
}

export default Gigs;
