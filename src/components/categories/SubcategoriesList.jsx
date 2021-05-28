import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

function SubcategoriesList() {
  const subcategories = useSelector((state) => state.categories.subcats.content);

  return (
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Subcategory Name</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {subcategories.map((subcat,index) => {
          return (
            <tr key={subcat.id}>
              <td>{index + 1}</td>
              <td>{subcat.name}</td>
              <td>{subcat.category}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default SubcategoriesList;
