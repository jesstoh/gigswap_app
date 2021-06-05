import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { fetchTalents } from '../../slices/talentsSlice';
import TalentsList from '../../components/talents/TalentsList';

function TalentsPage() {
  const dispatch = useDispatch();
  // Get all subcategories as options
  const subcategories = useSelector(
    (state) => state.categories.subcats.content
  );

  //Store value typed in search bar
  const [searchValue, setSearchValue] = useState('');
  //Store value in filter section
  const [filterValue, setFilterValue] = useState({
    skills: [],
    rating: 0,
    gigs_won: 0,
  });

  //current active page
  const [activePage, setActivePage] = useState(1);
  const pageCount = useSelector((state) => state.talents.pageCount); // To change to the one from api

  const [urlQuery, setUrlQuery] = useState('?');

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
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

  // Handle range change
  function handleRangeChange(e) {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  }

  //Clearing filter
  function clearFilter(e) {
    e.preventDefault();
    setFilterValue({
      skills: [],
      rating: 0,
      gigs_won: 0,
    });
  }

  // clear rating
  function handleClearRating() {
    setFilterValue({ ...filterValue, rating: 0 });
  }

  // handling submit search
  function handleSearch(e) {
    e.preventDefault();
    //Set it into current url query
    const searchUrl = `?search=${searchValue}`;
    setUrlQuery(searchUrl); //Set current url query
    dispatch(fetchTalents(searchUrl)); //Fetching talents with search params
    setFilterValue({
      skills: [],
      rating: 0,
      gigs_won: 0,
    }); // clear filter
  }

  //When clicking on filter button
  function handleFilter(e) {
    e.preventDefault();
    console.log(filterValue);
    const filterUrl = `?filter=true&gigs_won=${
      filterValue.gigs_won
    }&rating=${filterValue.rating}&skills=${JSON.stringify(
      filterValue.skills
    )}`;
    setUrlQuery(filterUrl); //Set current url query
    dispatch(fetchTalents(filterUrl)); //Fetching talents with filter params
    setSearchValue(''); // reset search value
  }

  //Fetch talents when clicking on page button
  function handlePageChange(e) {
    setActivePage(Number(e.target.id));
    const pageUrl = urlQuery + '&page=' + e.target.id;
    dispatch(fetchTalents(pageUrl));
    // console.log(urlQuery + '&page=' + e.target.id);
  }

  // Handle change by clicking on star of rating
  function handleRatingChange(e) {
    setFilterValue({ ...filterValue, rating: Number(e.currentTarget.id) });
  }

  useEffect(() => {
    dispatch(fetchTalents());
  }, []);

  const searchContainer = (
    <Container className="px-5 my-3">
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs="9" sm={{ span: 8, offset: 3 }}>
            <Form.Control
              type="text"
              name="search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs="2" sm="1">
            <Button className=" px-2 " type="submit">
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
          <Form.Label>Skills</Form.Label>
          <Form.Control
            // required
            as="select"
            multiple
            name="skills"
            value={filterValue.skills}
            onChange={multiSelectChange}
          >
            {subcategories.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Overall Rating</Form.Label>
          <div>
            {[1, 2, 3, 4, 5].map((ele) => {
              return ele <= filterValue.rating ? (
                <span key={ele} id={ele} onClick={handleRatingChange}>
                  <FaStar className="text-warning link-like" />
                </span>
              ) : (
                <span key={ele} id={ele} onClick={handleRatingChange}>
                  <FaRegStar className="text-warning link-like" />
                </span>
              );
            })}{' '}
            <span
              onClick={handleClearRating}
              className="text-muted text-smaller link-like ml-2"
            >
              Any review
            </span>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Min Gigs Won</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="50"
            name="gigs_won"
            value={filterValue.gigs_won}
            onChange={handleRangeChange}
          />
          <Form.Text> {filterValue.gigs_won}</Form.Text>
        </Form.Group>

        <div className="text-center ">
          <Button variant="primary" className="px-3 mt-3 mr-2" type="submit">
            Filter
          </Button>
          <Button
            variant="outline-secondary"
            className="px-3 mr-2 mt-3"
            onClick={clearFilter}
          >
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
          <TalentsList />
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

export default TalentsPage;
