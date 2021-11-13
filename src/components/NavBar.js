import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
				<Link className="navbar-brand" to="/motw">Bad Movie Night</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link" to="/motw">Movie of the Week</Link>
						<Link className="nav-link" to="/list">Movie List</Link>
					</Nav>
					<Nav>
						<Button variant="light">Sign In</Button>
					</Nav>
				</Navbar.Collapse>
		</Navbar>
    )
}

export default NavBar
