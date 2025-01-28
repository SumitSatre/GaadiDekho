import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Button, Paper, Grow } from '@mui/material';
import Navbar from './Navbar';

const VehicleInfoPage = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle; // Retrieve the vehicle from location.state

  // Check if the vehicle is available
  if (!vehicle) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f4f6f8',
        }}
      >
        <Typography variant="h6" color="error">
          Vehicle information is not available.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          minHeight: '100vh',
          padding: '40px 20px',
          backgroundColor: '#f4f6f8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grow in={true} timeout={1000}>
          <Paper
            elevation={6}
            sx={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Vehicle Image */}
            <img
              src={vehicle.image}
              alt={vehicle.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />

            {/* Vehicle Details */}
            <div style={{ padding: '32px', maxHeight: 'calc(100vh - 500px)' }}>
              <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', color: '#333333' }}>
                {vehicle.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                style={{ fontSize: '1.1rem', lineHeight: 1.6, wordBreak: 'break-word' }}
              >
                {vehicle.description}
              </Typography>
              <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', marginTop: '16px' }}>
                ₹{vehicle.price.toLocaleString()}
              </Typography>
            </div>

            {/* Contact Button */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{
                  padding: '12px 48px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                  },
                }}
                onClick={() => alert('Interested in the vehicle')}
              >
                Contact Seller
              </Button>
            </div>
          </Paper>
        </Grow>
      </Container>
    </>
  );
};

export default VehicleInfoPage;
