import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
import { Alert, Spinner } from 'react-bootstrap';
import { fetchSingleSubcat } from '../../slices/categoriesSlice.js';
import EditSubcategoryForm from '../../components/categories/EditSubcategoryForm';

function SubcategoryDetails({ match }) {
  const dispatch = useDispatch();
  const { error, status } = useSelector(
    (state) => state.categories.activeSubcat
  );

  const categories = useSelector((state) => state.categories.cats.content);
  const subcatId = match.params.id;

  useEffect(() => {
    dispatch(fetchSingleSubcat(subcatId));
  }, []);

  let content;

  // Conditional rendering form based on state of edit
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = <EditSubcategoryForm />;
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <>{content}</>;
}

export default SubcategoryDetails;
