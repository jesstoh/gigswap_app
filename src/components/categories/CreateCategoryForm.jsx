import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Form, Button } from 'react-bootstrap';
import { addCategory } from '../../slices/categoriesSlice.js';

function CreateCategoryForm() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  async function handleSubmit(data) {
    try {
      const result = await dispatch(addCategory(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      isSubmitted: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit({ name: values.name });
      values.name = ''
      values.isSubmitted = true;
      console.log(values);
    },
  });

  return (
    <Container>
      {/* <h4 className="text-center">Add New Category</h4> */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Form.Group>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            required={true}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreateCategoryForm;
