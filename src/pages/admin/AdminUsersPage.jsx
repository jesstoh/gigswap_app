import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Alert, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { fetchUsers } from '../../slices/adminsSlice';
import UsersList from '../../components/admins/UsersList';

function AdminUsersPage() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admins);
  // Set toggle button value
  const [isHirer, setIsHirer] = useState(false);

  // Fetch users upon first rendering
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // For toggling between talents & hirers
  function handleToggleChange(val){
    setIsHirer(val)
  }

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <Container className='px-5 py-3 my-3'>
        <h1 className='text-center'>User List</h1>
        <ToggleButtonGroup type='radio' name='isHirer' value={isHirer} onChange={handleToggleChange} >
          <ToggleButton value={false} variant='outline-primary'>Talent</ToggleButton>
          <ToggleButton value={true} variant='outline-primary'>Hirer</ToggleButton>
        </ToggleButtonGroup>
        {isHirer?<UsersList users={users.hirers}/> : <UsersList users={users.talents}/>}
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
