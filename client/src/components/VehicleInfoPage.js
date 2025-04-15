import React, { useState } from 'react';
import { Container, Button, Box, Typography, Grid, Dialog, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ReviewModal from './ReviewModal.js';
import AuthToken from '../helper/AuthToken';

const VehicleInfoPage = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle; // Retrieve the vehicle from location.state
  const [reviewOpen, setReviewOpen] = useState(false);

  const [reviews, setReviews] = useState(vehicle.reviews || []); // Ensure it's an array to avoid errors

  const token = AuthToken.getToken();

  const handleSubmitReview = async (reviewData) => {
    try {
      console.log("This is review Data : ", reviewData);

      if (!reviewData.rating || !reviewData.message.trim()) {
        console.error("Rating or comment is empty!");
        alert("Rating or comment is empty!");
        return;
      }

      const reviewBody = {
        "rating" : reviewData.rating,
        "comment" : reviewData.message
      }

      // console.log(`http://localhost:5000/api/v1/add/review/${vehicle._id}`);

      const response = await fetch(`${process.env.REACT_APP_BACKENDURL}/api/v1/add/review/${vehicle._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewBody),
      });

      const res = await response.json();
      const newReview = res.newReview;

      console.log("this is new review : " , newReview);

      // Update state with new review
      setReviews((prevReviews) => [...prevReviews, newReview]);

      // Close the modal after successful submission
      setReviewOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };


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
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f4f6f8',
          paddingTop: '80px', // Add padding to account for the Navbar
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            backgroundImage: `url(${vehicle.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
            backgroundBlendMode: 'multiply',
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              {vehicle.name}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Price Range: ₹{vehicle.priceMin.toLocaleString()} - ₹{vehicle.priceMax.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ padding: '40px 20px' }}>
          {/* Description Section */}
          <Box sx={{ marginBottom: '40px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              {vehicle.description}
            </Typography>
          </Box>

          {/* Additional Details Section */}
          <Box sx={{ marginBottom: '40px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
              Specifications
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Category
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.category}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Subcategory
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.subcategory}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Engine Capacity
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.engineCapacity} cc
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Mileage
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.mileage} km/l
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Transmission
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.transmission}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Kerb Weight
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.kerbWeight} kg
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Fuel Tank Capacity
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.fuelTankCapacity} liters
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Seat Height
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vehicle.seatHeight} mm
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Review Button */}

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'medium',
                borderRadius: '6px',
              }}
              onClick={() => setReviewOpen(true)}
            >
              Write a Review
            </Button>
          </Box>


          <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)}>
            <ReviewModal onClose={() => setReviewOpen(false)} onSubmit={handleSubmitReview} />
          </Dialog>


          {/* Reviews Section */}
          <Box>
            {reviews.length > 0 && (
              <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Reviews
                </Typography>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {reviews.map((review, index) => (
                    <Grid item xs={12} sm={6} md={4} key={review?._id ?? `review-${index}`}>
                      <Card
                        sx={{
                          padding: '12px',
                          borderRadius: '10px',
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#fff',
                        }}
                      >
                        <CardContent sx={{ padding: '12px' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {(review?.userName ?? "Unknown") + " " + `${review?.rating ?? 0}⭐`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginBottom: '6px' }}>
                          {new Date(review?.createdAt ?? new Date()).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic' }}>
                            "{review?.comment ?? ""}"
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

          </Box>
        </Container>

      </Box>
    </>
  );
};

export default VehicleInfoPage;