// frontEnd/frontend/src/components/Footer.js

import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-5 bg-warning m-auto ">
      <Container className='p-4'>
        <Row>
          <Col md={4} className="mb-4 text-center bg-warning">
            <h5>About Us</h5>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Link to="#">Our Story</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#" className="text-muted bg-warning">Our Team</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#">Contact Us</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Link to="#">Home</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#">About</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#">Services</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Follow Us</h5>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Link to="#">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i> Facebook
                </Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#">
                  <i className="fab fa-twitter" aria-hidden="true"></i> Twitter
                </Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i> Instagram
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <p>&copy; 2023 EduPlatform. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;