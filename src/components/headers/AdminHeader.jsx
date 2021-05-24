import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { logout } from '../../slices/authenticationSlice';

function AdminHeader() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  return (
    <Navbar
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
          <Nav.Link href="/admin/dashboard" className="mr-2">
            Dashboard
          </Nav.Link>
          <NavDropdown
            alignRight
            title="Maintenance"
            id="collasible-nav-dropdown"
            size="lg"
            className="text-white mr-4"
          >
            <NavDropdown.Item href="/admin/categories">
              Category
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/maintenance/users">
              Users
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/maintenance/gigs">
              Gigs
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="mr-4 text-white" onClick={handleLogout}>
            <FaUser size={23} /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminHeader;
