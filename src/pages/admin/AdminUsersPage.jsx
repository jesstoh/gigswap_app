import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { fetchUsers } from '../../slices/adminsSlice';
import UsersList from '../../components/admins/UsersList';

function AdminUsersPage() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admins);

  // Fetch users upon first rendering
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <Container>
        <UsersList users={users.talents} />
      </Container>
    );
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <>{content}</>;
}

export default AdminUsersPage;
