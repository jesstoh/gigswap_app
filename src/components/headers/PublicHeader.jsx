import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { FaUser} from "react-icons/fa"

function AdminHeader() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className='px-4'>
 
      <Navbar.Brand href="/">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

        </Nav>
        <Nav >
          <Nav.Link href="/login" className='mr-2'>Login</Nav.Link>
          
          <Nav.Link className='mr-4 text-white' href='/register'><FaUser size={23}/> Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminHeader;
