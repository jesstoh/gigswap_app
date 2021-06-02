import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button} from 'react-bootstrap';

function SearchGigs() {
  const [formValue, setFormValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
      e.preventDefault()
  }

  return (
    <Form inline className='d-flex' onSubmit={handleSubmit}>
      <Form.Control
        // className="rounded-pill"
        type="text"
        name="search"
        value={formValue}
        onChange={handleChange}
      />

      <Button
        // variant="primary rounded-pill"
        className="ml-2 px-2 "
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default SearchGigs;
