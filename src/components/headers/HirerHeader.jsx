import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser, FaBell, FaComment } from 'react-icons/fa';
import { handleLogout } from '../../utilz/authenticationUtilz';
import { withRouter } from "react-router-dom";

function HirerHeader({location}) {
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
      <Navbar.Brand href="/talents">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/talents" active={currentPath === '/talents'}>Talents</Nav.Link>
          <Nav.Link href="/hirer/mypage" active={currentPath === '/hirer/mypage'}>MyWorkspace</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/notifications" className="mr-2 text-white">
            <FaBell size={23} />

            <Badge
              variant="warning"
              pill
              className="align-top notification-badge "
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
                <FaUser size={23} /> {username}
              </span>
            }
            id="collasible-nav-dropdown"
            size="lg"
            className="text-white"
          >
            <NavDropdown.Item href="/gigs/create">Create Gig</NavDropdown.Item>
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

export default withRouter(HirerHeader);
