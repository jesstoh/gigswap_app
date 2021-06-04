import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { capitalizeWord } from '../../utilz/format';
import { useHistory } from 'react-router-dom';
import Axios from '../../utilz/Axios';
import { fetchSubcats } from '../../slices/categoriesSlice';

function SubcategoryDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { subcat } = useSelector((state) => state.categories.activeSubcat);

  const categories = useSelector((state) => state.categories.cats.content);

  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState({
    name: subcat.name,
    category: subcat.category_id,
  });

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  async function handleEdit(e) {
    e.preventDefault();
    const formatName = capitalizeWord(formValue.name);
    const data = { name: formatName, category: formValue.category };
    console.log(data);
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/categories/sub/${subcat.id}/`,
        data
      );
      dispatch(fetchSubcats());
      history.push('/admin/categories');
    } catch (err) {
      setErrorMessage(err.response.detail);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/categories/sub/${subcat.id}/`
      );
      dispatch(fetchSubcats());
      history.push('/admin/categories');
    } catch (err) {
      setErrorMessage(err.response.detail);
    }
  }

  return (
    <Container className="px-5 py-3 my-5 ">
      {errorMessage && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleEdit}>
            <Form.Group>
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                value={formValue.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formValue.category}
                required
                onChange={handleChange}
              >
                <option value="">Please select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="text-center mt-3">
              <Button
                variant="outline-primary"
                className="mr-2"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button variant="primary" className="px-4" type="submit">
                Edit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SubcategoryDetails;
