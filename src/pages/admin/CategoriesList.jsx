import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateCategoryForm from '../../components/categories/CreateCategoryForm';

function CategoriesList() {
  return (
    <Container className='mt-4'>
      <Row>
        <Col md="5">
          <CreateCategoryForm />
          <div>Category List</div>
        </Col>
        <Col>
          <div>Create Subcategry</div>
          <div>Subcategry List</div>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesList;
