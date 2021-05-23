import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FaUser, FaBell, FaComment } from "react-icons/fa"

function HirerHeader() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className='px-4'>
 
      <Navbar.Brand href="/">Gigswap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/talents">Talents</Nav.Link>
          <Nav.Link href="/hirer/mygigs">My Gigs</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/notifications" className='mr-2 text-white'><FaBell size={20}/></Nav.Link>
          <Nav.Link href="#chat" className='mr-4 text-white' ><FaComment size={20}/></Nav.Link>
          <NavDropdown alignRight 
            title={<span className='text-white'><FaUser size={23}/> User </span>}
            id="collasible-nav-dropdown"
            size="lg" className='text-white'>
            <NavDropdown.Item href="/gigs/create">Create Gig</NavDropdown.Item>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HirerHeader;
