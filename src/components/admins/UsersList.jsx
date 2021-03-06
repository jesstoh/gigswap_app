import React from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { parseISO, format } from 'date-fns';
import { deactivateUser, activateUser } from '../../slices/adminsSlice';

function UsersList({ users }) {
  const dispatch = useDispatch();

  return (
    <Table striped bordered hover className="mt-5 text-center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Username</th>
          <th>Email</th>
          <th className="px-2">Date Joined</th>
          <th>Profile Complete?</th>
          <th className="px-5">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{format(parseISO(user.date_joined), 'd MMM yyyy')}</td>
              <td>
                {user.is_profile_complete ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td>
                {user.is_active ? (
                  <Button
                    variant="outline-primary"
                    onMouseEnter={(e) =>
                      (e.currentTarget.innerText = 'Deactivate')
                    }
                    onMouseLeave={(e) => (e.currentTarget.innerText = 'Active')}
                    style={{ width: '100%' }}
                    onClick={() =>
                      dispatch(
                        deactivateUser({
                          isHirer: user.is_hirer,
                          userId: user.id,
                        })
                      )
                    }
                  >
                    Active
                  </Button>
                ) : (
                  <Button
                    onMouseEnter={(e) =>
                      (e.currentTarget.innerText = 'Activate')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.innerText = 'Inactive')
                    }
                    style={{ width: '100%' }}
                    onClick={() =>
                      dispatch(
                        activateUser({
                          isHirer: user.is_hirer,
                          userId: user.id,
                        })
                      )
                    }
                  >
                    Inactive
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UsersList;
