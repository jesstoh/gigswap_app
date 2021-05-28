import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button } from 'react-bootstrap';
import { capitalizeWord } from '../../utilz/format';
import { addSubcategory } from '../../slices/categoriesSlice.js';

function CreateSubcategoryForm() {
  const categories = useSelector(
    (state) => state.categories.cats.content
  ).slice();

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formValue, setFormValue] = useState({ name: '', category: '' });
  const [edit, setEdit] = useState(false);

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formatName = capitalizeWord(formValue.name);
    const data = { name: formatName, category: formValue.category };
    console.log(data)
    try {
      const result = await dispatch(addSubcategory(data));
      unwrapResult(result);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.detail);
    } finally {
      setFormValue({ name: '', category: '' })
    }
    console.log(formValue);
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" className="px-4" type="submit">
          Add
        </Button>
      </div>
    </Form>
  );
}

export default CreateSubcategoryForm;
