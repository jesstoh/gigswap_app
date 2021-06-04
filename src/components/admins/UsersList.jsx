import React from 'react';
import { Table } from 'react-bootstrap';

function UsersList({ users }) {
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr className='text-center'>
          <th>No.</th>
          <th>Username</th>
          <th>Email</th>
          <th>Profile Complete?</th>
          <th>Date Joined</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className='text-center'>{user.is_profile_complete?'Yes':'No'}</td>
              <td>{user.date_joined}</td>
              <td className='text-center'>{user.is_active?'Yes':'No'}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UsersList;
