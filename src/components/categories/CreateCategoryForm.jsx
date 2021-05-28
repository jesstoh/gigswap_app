import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { addCategory } from '../../slices/categoriesSlice.js';

function CreateCategoryForm() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);

  //   const schema = yup.object().shape({
  //     name: yup.string().required(),
  //   });

  async function handleSubmit(e) {
    e.preventDefault();
    const formatName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const data = { name: formatName };
    try {
      const result = await dispatch(addCategory(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(Object.values(err.data)[0][0]);
    } finally{
        setName('')
        setEdit(false)
    }

  }

  //   const formik = useFormik({
  //     initialValues: {
  //       name: '',
  //       isSubmitted: true,
  //     },
  //     validationSchema: schema,
  //     onSubmit: (values) => {
  //       console.log(values);
  //       handleSubmit({ name: values.name });
  //       values.name = '';
  //       values.isSubmitted = true;
  //       console.log(values);
  //     },
  //   });

  let content;

  if (!edit) {
    content = (
      <Button
        onClick={() => {
          setEdit(true);
          setErrorMessage(null);
        }}
      >
        Add category
      </Button>
    );
  } else {
    content = (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            required={true}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <Container>
      {errorMessage && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}
      {content}
    </Container>
  );
}

export default CreateCategoryForm;
