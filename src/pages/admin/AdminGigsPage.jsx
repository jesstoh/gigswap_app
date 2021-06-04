import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { fetchAdminGigs } from '../../slices/adminsSlice';
import GigsTable from '../../components/admins/GigsTable';

function AdminGigsPage() {
  const dispatch = useDispatch();
  const { gigs, status, error } = useSelector((state) => state.admins);

  // Fetch active gigs upon first rendering
  useEffect(() => {
    dispatch(fetchAdminGigs({ active: 'false' }));
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
      <Container className='px-5 py-3 my-3'>
        <h1 className='text-center'>Gigs List</h1>
        <GigsTable gigs={gigs} />
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

export default AdminGigsPage;
