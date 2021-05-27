import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CreateCategoryForm() {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      isSubmitted: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {},
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
