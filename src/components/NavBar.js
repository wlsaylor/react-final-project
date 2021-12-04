import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
				<Link className="navbar-brand" to="/motw">Cult Movie Night</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Link className="nav-link" to="/motw">Movie of the Week</Link>
						<Link className="nav-link" to="/list">Movie List</Link>
					</Nav>
				</Navbar.Collapse>
		</Navbar>
    )
};

export default NavBar;
