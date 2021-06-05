import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Spinner,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { fetchAdminGigs } from '../../slices/adminsSlice';
import GigsTable from '../../components/admins/GigsTable';
import ActiveGigsTable from '../../components/admins/ActiveGigsTable';

function AdminGigsPage() {
  const dispatch = useDispatch();
  const { gigs, status, error } = useSelector((state) => state.admins);

  const [active, setActive] = useState(true);

  // Fetch active gigs upon first rendering
  useEffect(() => {
    dispatch(fetchAdminGigs({ active: active }));
  }, [active]);

  // For toggling between talents & hirers
  function handleToggleChange(val) {
    setActive(val);
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
      <>
        <ToggleButtonGroup
          type="radio"
          name="active"
          value={active}
          onChange={handleToggleChange}
        >
          <ToggleButton value={true} variant="outline-primary">
            Active
          </ToggleButton>
          <ToggleButton value={false} variant="outline-primary">
            All
          </ToggleButton>
        </ToggleButtonGroup>
        {active ? <ActiveGigsTable gigs={gigs} /> : <GigsTable gigs={gigs} />}
      </>
    );
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Container className='px-5 py-3 my-3'>
      <h1 className="text-center">Gigs List</h1>
      {content}
    </Container>
  );
}

export default AdminGigsPage;
