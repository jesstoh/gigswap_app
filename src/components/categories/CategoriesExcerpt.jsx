import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { editCategory } from '../../slices/categoriesSlice';

function CategoriesExcerpt({ cat, index }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(cat.name);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmitEdit() {
    dispatch(editCategory({ data: { name }, catId: cat.id }));
    setEdit(false)
  }

  return (
    <tr key={cat.id}>
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
            <Button variant="outline-secondary">DELETE</Button>
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
