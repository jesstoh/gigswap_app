import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

function PublicHeader({location}) {
  // Get current url
  const currentPath = location.pathname;

  return (
    <Navbar fixed='top'
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="px-4"
    >
      <Navbar.Brand href="/">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/login" className="mr-2" active={currentPath === '/login'}>
            Login
          </Nav.Link>

          <Nav.Link className="mr-4" href="/register" active={currentPath === '/register'}>
            {' '}
            Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  
  );
}

export default withRouter(PublicHeader);
