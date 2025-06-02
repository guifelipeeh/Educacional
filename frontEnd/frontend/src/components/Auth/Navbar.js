import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const NavigationBar = () => {
  return (
    <Navbar className="navbar-mclaren w-100" expand="lg" bg="silver" style={{ backgroundColor: 'orange' }}>
      <Container className="px-0">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top me-3"
            alt="EduPlatform logo"
          />
          EduPlatform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto"> {/* Classe mx-auto para centralizar os links */}
            <Nav.Link as={Link} to="/">Cursos</Nav.Link>
            <Nav.Link as={Link} to="/">Como funciona</Nav.Link>
            <Nav.Link as={Link} to="/">Seja um dos nossos professores</Nav.Link>
          </Nav>
          <div className="ms-auto"> {/* Classe ms-auto para empurrar os botões para a direita */}
            <Button variant="dark" as={Link} to="/register" className="me-2">Registre-se</Button>
            <Button variant="secondary" as={Link} to="/login" className="mr-2">Conecte-se</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;