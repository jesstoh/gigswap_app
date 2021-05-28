import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

function CreateSubcategoryForm() {
  const categories = useSelector(
    (state) => state.categories.cats.content
  ).slice();

  return (
    <Form>
      <Form.Group>
        <Form.Label>Subcategory Name</Form.Label>
        <Form.Control type="text" required name="name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category">
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
