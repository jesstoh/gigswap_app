import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { fetchAdminDashboard } from '../../slices/adminsSlice';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { summary, status, error } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
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
      <Container className="px-5 py-3 my-3">
        <h2 className="text-center">Admin Dashboard</h2>
        <Row className="text-center mt-3">
          <Col className='p-3'>
            <div className="border rounded full-size p-3">
              <h5>TALENT</h5>
              <span className='text-larger'> {summary.talentsCount}</span>
             
            </div>
          </Col>
          <Col className='p-3'>
            <div className="border rounded full-size p-3">
              <h5>HIRER</h5>
              <span className='text-larger'> {summary.hirersCount}</span>
            </div>
          </Col>
          <Col className='p-3'>
            <div className="border rounded full-size p-3">
              <h5>ALL GIGS</h5>
              <span className='text-larger'> {summary.gigsCount}</span>
            </div>
          </Col>
          <Col className='p-3'>
            <div className="border rounded full-size p-3">
              <h5>ACTIVE GIGS</h5>
              <span className='text-larger'> {summary.activeGigsCount}</span>
            </div>
          </Col>
        </Row>
        <Container className='mt-4 graph-container text-white text-center bg-dark border rounded p-3' style={{'minHeight': '50vh'}}>
          <h2>Placeholder for graph</h2>

        </Container>
      </Container>
    );
  }else if (status === 'failed') {
    //Show error if fetch failed
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <>{content}</>;
}

export default AdminDashboard;
