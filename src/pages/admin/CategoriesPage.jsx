import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateCategoryForm from '../../components/categories/CreateCategoryForm';
import CategoriesList from '../../components/categories/CategoriesList'

function CategoriesPage() {
  return (
    <Container className='mt-4'>
      <Row>
        <Col md="5">
          <CreateCategoryForm />
          <CategoriesList/>
        </Col>
        <Col>
          <div>Create Subcategry</div>
          <div>Subcategry List</div>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesPage;
