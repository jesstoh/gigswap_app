import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchCategories, fetchSubcats } from '../../slices/categoriesSlice';
import Axios from '../../utilz/Axios';

function CategoriesExcerpt({ cat, index }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(cat.name);

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleSubmitEdit() {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/categories/${cat.id}/`,
        { name }
      );
      dispatch(fetchCategories());
      dispatch(fetchSubcats());
      setEdit(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  async function deleteCategory() {
    try {
      const response = await Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/categories/${cat.id}/`
      );
      dispatch(fetchCategories());
      dispatch(fetchSubcats());
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <tr>
      <td>{index + 1}</td>
      {edit ? (
        <>
          <td>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </td>
          <td>
            <Button onClick={handleSubmitEdit}>Save</Button>
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>

          <td>
            <Button
              onClick={() => setEdit(true)}
              variant="outline-primary mr-2"
            >
              EDIT
            </Button>
            <Button variant="outline-secondary" onClick={deleteCategory}>
              DELETE
            </Button>
          </td>
        </>
      )}

      {/* <td>{edit ? <input type="text" name="name" value={name} /> : name}</td>
      <td>
        <Button onClick={() => setEdit(true)}>EDIT</Button>
        <Button>DELETE</Button>
      </td> */}
    </tr>
  );
}

export default CategoriesExcerpt;
