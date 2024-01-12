import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const CitySearch = ({ onCitySelect }) => {
  const [city, setCity] = useState('');
  const [citiesWithSameName, setCitiesWithSameName] = useState([]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSelectCity = async () => {
    if (city.trim() !== '') {
      const API_KEY = 'f07e23e3c9bbfe73897c8d5ff15322cd';
      const BASE_URL = 'https://api.openweathermap.org/data/2.5/find';

      try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();


        const citiesWithSameName = data.list.filter((cityData) => cityData.name.toLowerCase() === city.toLowerCase());

        setCitiesWithSameName(citiesWithSameName);
      } catch (error) {
        console.error('Error fetching city data:', error);
        setCitiesWithSameName([]);
      }

      onCitySelect(city);
    }
  };

  return (
    <div>
      <Form className="d-flex mb-4">
        <Form.Group controlId="formCity" className="mr-2">
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary ms-3" onClick={handleSelectCity} className="mx-auto">
          Get Weather
        </Button>
      </Form>
      
      {citiesWithSameName.length > 0 && (
        <div>
          <h4>Città:</h4>
          <div className='d-inline-flex'>
            {citiesWithSameName.map((cityData, index) => (
              <Card key={index} className="m-2 shadow-lg" style={{ width: '10em' }}>
                <Card.Body>
                  <Card.Title>{cityData.name}, {cityData.sys.country}</Card.Title>
                  

                   <Card.Img
                    variant="top"
                    src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`}
                    alt="Weather Icon"
                  /> 
                  <ListGroup>
                    <ListGroup.Item>Temperature: {cityData.main.temp}°C</ListGroup.Item>
                    <ListGroup.Item>Min Temperature: {cityData.main.temp_min}°C</ListGroup.Item>
                    <ListGroup.Item>Max Temperature: {cityData.main.temp_max}°C</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
