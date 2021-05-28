import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { addCategory } from '../../slices/categoriesSlice.js';
import { capitalizeWord } from '../../utilz/format';

function CreateCategoryForm() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formatName = capitalizeWord(name);
    const data = { name: formatName };
    console.log(data);
    try {
      const result = await dispatch(addCategory(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(Object.values(err.data)[0][0]);
    } finally {
      setName('');
      setEdit(false);
    }
  }

  function handleCancel(e){
      e.preventDefault()
      setEdit(false)
      setName('')
  }

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
          <Button variant="outline-primary" className='mr-2' onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" className='px-4' type="submit">
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
