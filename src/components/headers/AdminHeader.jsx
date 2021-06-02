import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { handleLogout } from '../../utilz/authenticationUtilz';

function AdminHeader({location}) {
  const dispatch = useDispatch();

  //   function handleLogout() {
  //     dispatch(logout());
  //     localStorage.removeItem('access');
  //     localStorage.removeItem('refresh');
  //   }

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
      <Navbar.Brand href="/admin/dashboard">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/talents">Talents</Nav.Link>
          <Nav.Link href="/hirer/mygigs">My Gigs</Nav.Link> */}
        </Nav>
        <Nav>
          <Nav.Link href="/admin/dashboard" className="mr-2" active={currentPath === '/admin/dashboard'}>
            Dashboard
          </Nav.Link>
          <NavDropdown
            alignRight
            title="Maintenance"
            id="collasible-nav-dropdown"
            size="lg"
            className="text-white mr-4" active={['/admin/categories', '/admin/maintenance/users', '/admin/maintenance/gigs'].includes(currentPath)}
          >
            <NavDropdown.Item href="/admin/categories" active={currentPath === '/admin/categories'}>
              Category
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/maintenance/users" active={currentPath === '/admin/maintenance/users'}>
              Users
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/maintenance/gigs" active={currentPath === '/admin/maintenance/gigs'}>
              Gigs
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            className="mr-4 text-white"
            onClick={() => handleLogout(dispatch)}
          >
            <FaUser size={23} className="mr-2" /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(AdminHeader);
