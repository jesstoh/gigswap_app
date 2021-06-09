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
      <Container className="px-5 py-3 my-3" >
        <h2 className="text-center mb-3">Admin Dashboard</h2>
        <Row className="text-center mt-3 py-3 px-1 rounded shadow-sm" style={{'backgroundColor': 'rgba(173, 216, 230, 0.4)'}}>
        <Col xs='12'className='text-left'><h4>USERS</h4></Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>ALL</h5>
              <a href='/admin/maintenance/users' className='text-larger line-less'>{summary.usersCount}</a>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>TALENT</h5>
              <span className=" text-larger"> {summary.talentsCount}</span>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>HIRER</h5>
              <span className="text-larger"> {summary.hirersCount}</span>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h6>PROFILE COMPLETE</h6>
              <span className="text-larger">
                {summary.profileCompleteRate}
              </span>
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-5 py-3 px-2 rounded shadow-sm" style={{'backgroundColor': 'rgba(211, 211, 211, 0.3)'}}>
          <Col xs='12'className='text-left'><h4>GIGS</h4></Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>ALL</h5>
              <a href='/admin/maintenance/gigs' className='text-larger line-less'>{summary.gigsCount}</a>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>ACTIVE</h5>
              <span className="text-larger"> {summary.activeGigsCount}</span>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>AWARD</h5>
              <span className="text-larger"> {summary.gigsAwardRate} %</span>
            </div>
          </Col>
          <Col xs='6' sm='3' className="p-2">
            <div className="bg-white rounded full-size p-3">
              <h5>CANCEL</h5>
              <span className="text-larger"> {summary.gigsCancelRate} %</span>
            </div>
          </Col>
        </Row>
        {/* <Container
          className="mt-4 graph-container text-white text-center bg-dark border rounded p-3"
          style={{ minHeight: '50vh' }}
        >
          <h2>Placeholder for graph</h2>
        </Container> */}
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

export default AdminDashboard;
