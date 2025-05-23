import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/vehicleinfo/${vehicle._id}`, { state: { vehicle } });
  };


  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: { xs: 250, sm: 280, md: 300 }, // Consistent height based on screen size
        width: "100%",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={vehicle.image}
        alt={vehicle.name}
        sx={{
          height: "60%", // Proportionate height for the image
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ padding: 1.5 }}>
        <Typography variant="subtitle1" gutterBottom noWrap>
          {vehicle.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.875rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {vehicle.description}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: "bold", marginTop: 1 }}
        >
          Price Range: ₹{vehicle.priceMin.toLocaleString()} - ₹{vehicle.priceMax.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
const VehicleList = ({ vehicles , loading }) => {
  const searchText = useSelector((state) => state.search.searchText);
  const { category, subcategory } = useSelector((state) => state.category);

  useEffect(() => {
    if (searchText) {
      console.log("Search text changed:", searchText);
    }
  }, [searchText]);

  // Convert search text to lowercase for case-insensitive comparison
  const lowerCaseSearchText = searchText?.toLowerCase() || "";

  // Filter vehicles based on searchText, category, and subcategory
  const filteredVehicles = vehicles.filter((vehicle) => {
    const categoryMatch = category ? vehicle.category === category : true;
    const subcategoryMatch =
      subcategory && subcategory !== "All" ? vehicle.subcategory === subcategory : true;
    
    const searchMatch = searchText
      ? vehicle.name.toLowerCase().includes(lowerCaseSearchText) // Modify to match relevant field
      : true;

    return categoryMatch && subcategoryMatch && searchMatch;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ marginTop: 3, padding: 2 }}>
      <Grid container spacing={2}>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle._id}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ width: "100%", marginTop: 3 }}
          >
            No vehicles found for the selected category, subcategory, or search text.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default VehicleList;