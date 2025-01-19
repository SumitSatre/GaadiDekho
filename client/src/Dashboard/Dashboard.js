import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import Navbar from "../components/Navbar.js";
import AddVehicle from './AddVehicle.js';

// import CreateFoodItem from './createFoodItem';
// import FoodItemsDisplay from './FoodItemsDisplay';
// import UserDataDisplay from './UserDataDisplay';

const AdminPage = () => {
  const [activePage, setActivePage] = useState('add vehicle');

  const handleButtonClick = (page) => {
    setActivePage(page);
  };

  const renderPageContent = () => {
    if (activePage === 'add vehicle') {
      return (
        <div>
         <AddVehicle /> 
        </div>
      );
    } 
    else if (activePage === 'users') {
      return (
        <div>
          <h2 style={{ color: '#333' }}>Users Page</h2>
          {/*  <UserDataDisplay /> */}
        </div>
      );
    } 
    else if (activePage === 'createFoodItem') {
      return (
        <div>
         {/*  <CreateFoodItem /> */}
        </div>
      );
    }
  };

  return (
    <div>
        <Navbar />
      <Container fluid style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Row>
          <Col md={2}>
            <Card>
              <Card.Header style={{ backgroundColor: '#333', color: '#fff' }}>Admin Panel</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item
                  active={activePage === 'add vehicle'}
                  onClick={() => handleButtonClick('add vehicle')}
                  style={{ backgroundColor: activePage === 'add vehicle' ? '#666' : '#f9f9f9', color: activePage === 'add vehicle' ? '#fff' : '#333' }}
                >
                  Add Vehicle
                </ListGroup.Item>

                <ListGroup.Item
                  active={activePage === 'users'}
                  onClick={() => handleButtonClick('users')}
                  style={{ backgroundColor: activePage === 'users' ? '#666' : '#f9f9f9', color: activePage === 'users' ? '#fff' : '#333' }}
                >
                  Users
                </ListGroup.Item>

                <ListGroup.Item
                  active={activePage === 'createFoodItem'}
                  onClick={() => handleButtonClick('createFoodItem')}
                  style={{ backgroundColor: activePage === 'createFoodItem' ? '#666' : '#f9f9f9', color: activePage === 'createFoodItem' ? '#fff' : '#333' }}
                >
                  Vehicles
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
          <Col md={10} style={{ paddingTop: '20px' }}>
            {renderPageContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
