import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from '../components/Auth/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/home.css';

const Home = () => {
  const [slides, setSlides] = useState([]); // Estado para armazenar os slides

  useEffect(() => {
    axios.get('/api/slides')
      .then(response => {
        setSlides(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <div className="carousel-container">
      <img
                className="d-block w-50 img-thumbnail"
                src="https://cdn.images.express.co.uk/img/dynamic/143/940x/Sony-PS5-console-review-1359497.jpg?r=1691411183353"
                
                
              />
        <Carousel>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              
              <Carousel.Caption>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Footer className="footer-fixed" />
    </div>
  );
};

export default Home;