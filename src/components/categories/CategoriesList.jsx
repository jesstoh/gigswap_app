import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import CategoriesExcerpt from './CategoriesExcerpt';

function CategoriesList() {
  const categories = useSelector((state) => state.categories.cats.content);

  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>No.</th>
          <th>Category Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat, index) => (
          <CategoriesExcerpt index={index} cat={cat} />
        ))}
      </tbody>
    </Table>
  );
}

export default CategoriesList;

// {categories.map((cat,index) => {
//   return (
//     <tr key={cat.id}>
//       <td>{index + 1}</td>
//       <td>{cat.name}</td>
//     </tr>
//   );
// })}
