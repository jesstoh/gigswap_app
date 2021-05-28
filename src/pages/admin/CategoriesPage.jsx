import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateCategoryForm from '../../components/categories/CreateCategoryForm';
import CreateSubcategoryForm from '../../components/categories/CreateSubcategoryForm';
import CategoriesList from '../../components/categories/CategoriesList';
import SubcategoriesList from '../../components/categories/SubcategoriesList';

function CategoriesPage() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md="5" className='mx-3'>
          <CreateCategoryForm />
          <CategoriesList />
        </Col>
        <Col className='mx-3'>
          <CreateSubcategoryForm />
          <SubcategoriesList />
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesPage;
