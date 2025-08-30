import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarComponent() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">SAP Test</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/items">Itens</Nav.Link>
                    <Nav.Link as={Link} to="/partners">Parceiros</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
