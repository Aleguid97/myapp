import React, { useState } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import CitySearch from './components/CitySearch';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = async (city) => {
    const API_KEY = 'f07e23e3c9bbfe73897c8d5ff15322cd';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    try {
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      const cityData = {
        name: data.name,
        sys: data.sys,
        weather: data.weather,
        main: data.main,
      };

      setSelectedCity(cityData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setSelectedCity(null);
    }
  };

  return (
    <Container className="mt-5">
      <Navbar bg="light" expand="lg" className="mb-4">
        <h1 className='ms-3'>App Meteo</h1>
      </Navbar>
      <Row className="">
        <Col md={6}>
          <CitySearch onCitySelect={handleCitySelect} />
        </Col>
      </Row>
      {selectedCity && (
        <Row className="justify-content-center mt-4">
        </Row>
      )}
    </Container>
  );
};

export default App;
