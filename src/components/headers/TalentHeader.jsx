import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser, FaBell, FaComment } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { handleLogout } from '../../utilz/authenticationUtilz';

function TalentHeader({ location }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authentication.user.username);
  const unreadNotification = useSelector((state) => state.notifications.unread);

  // Get current url
  const currentPath = location.pathname;
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="px-4"
    >
      <Navbar.Brand href="/gigs">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/gigs" active={currentPath === '/gigs'}>Gigs</Nav.Link>
          <Nav.Link href="/gigs/recommended" active={currentPath === '/gigs/recommended'}>Hot Gigs</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/notifications" className="mr-2 text-white">
            <FaBell size={23} />

            <Badge
              variant="warning"
              pill
              className="align-top notification-badge"
            >
              {unreadNotification}
            </Badge>
          </Nav.Link>
          <Nav.Link href="/chats" className="mr-4 text-white">
            <FaComment size={23} />
          </Nav.Link>
          <NavDropdown
            alignRight
            title={
              <span className="text-white">
                <FaUser size={23} /> {username}{' '}
              </span>
            }
            id="collasible-nav-dropdown"
            size="lg"
            className="text-white"
          >
            <NavDropdown.Item href="/talent/mygigs">My Gigs</NavDropdown.Item>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleLogout(dispatch)}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(TalentHeader);
