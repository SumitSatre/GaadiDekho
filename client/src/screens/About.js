import React from "react";
import { Box, Typography, Container, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/Navbar";

const BackgroundContainer = styled(Box)({
  backgroundImage: 'url("https://source.unsplash.com/random/1600x900?vehicles")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
});

const AboutPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 900,
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
}));

const AboutPage = () => {
  return (
    <>
    <Navbar />
    <BackgroundContainer>
      <Container maxWidth="lg">
        <AboutPaper>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: "text.secondary",
              fontSize: "1.1rem",
            }}
          >
            Welcome to our platform, the ultimate destination for all things
            vehicles! Whether you're interested in cars, bikes, trucks, or any
            other kind of vehicle, we offer a wide variety of options for you to
            explore, compare, and learn about.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                What We Offer
              </Typography>
              <Typography variant="body1" paragraph>
                Our website allows you to explore various types of vehicles,
                including cars, bikes, and trucks. You can filter by brand, model,
                price range, and more to find the vehicle that suits your needs. We
                also provide detailed information on their features, specifications,
                and use cases, ensuring you have everything you need to make an
                informed decision.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to make vehicle selection easier and more informed.
                We aim to create a space where you can filter, view, and compare
                vehicles seamlessly, helping you find the best option for your
                needs, whether you're looking for a family car, a powerful sports
                bike, or a heavy-duty truck.
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button variant="contained" color="primary" href="/vehicles">
              Start Exploring Vehicles
            </Button>
          </Box>
        </AboutPaper>
      </Container>
    </BackgroundContainer>
    </>
  );
};

export default AboutPage;
