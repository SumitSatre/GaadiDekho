import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    image: '',
    description: '',
    priceMin: '',
    priceMax: '',
    category: '',
    subcategory: '',
    engineCapacity: '',
    mileage: '',
    transmission: '',
    kerbWeight: '',
    fuelTankCapacity: '',
    seatHeight: ''
  });

  const [error, setError] = useState('');

  // Available categories and their respective subcategories
  const categories = {
    Bikes: ["Mountain Bike", "Road Bike", "Hybrid Bike"],
    Cars: ["SUV", "Sedan", "Hatchback"],
    Scooters: ["Electric Scooter", "Kick Scooter"],
    Trucks: ["Pickup Truck", "Semi Truck"]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    const { name, image, description, priceMin, priceMax, category, subcategory } = vehicle;
    if (!name || !image || !description || !priceMin || !priceMax || !category || !subcategory) {
      setError('All fields are required.');
      return;
    }

    // Validate price range
    if (parseFloat(priceMax) < parseFloat(priceMin)) {
      setError('Maximum price must be greater than or equal to minimum price.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/add/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicle)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Vehicle added successfully: ${data.message}`);
        // Reset form after successful submission
        setVehicle({
          name: '',
          image: '',
          description: '',
          priceMin: '',
          priceMax: '',
          category: '',
          subcategory: '',
          engineCapacity: '',
          mileage: '',
          transmission: '',
          kerbWeight: '',
          fuelTankCapacity: '',
          seatHeight: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add vehicle.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Vehicle
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Vehicle Name"
              name="name"
              value={vehicle.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={vehicle.image}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={vehicle.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Minimum Price"
              name="priceMin"
              type="number"
              value={vehicle.priceMin}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0 }} // Ensure priceMin is not negative
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Maximum Price"
              name="priceMax"
              type="number"
              value={vehicle.priceMax}
              onChange={handleInputChange}
              required
              inputProps={{ min: vehicle.priceMin }} // Ensure priceMax >= priceMin
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={vehicle.category}
                onChange={handleInputChange}
              >
                {Object.keys(categories).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subcategory Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Subcategory</InputLabel>
              <Select
                name="subcategory"
                value={vehicle.subcategory}
                onChange={handleInputChange}
                disabled={!vehicle.category} // Disable until a category is selected
              >
                {vehicle.category &&
                  categories[vehicle.category].map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Other fields remain unchanged */}
          {/* New Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Engine Capacity (cc)"
              name="engineCapacity"
              type="number"
              value={vehicle.engineCapacity}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mileage (km/l)"
              name="mileage"
              type="number"
              value={vehicle.mileage}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transmission"
              name="transmission"
              value={vehicle.transmission}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kerb Weight (kg)"
              name="kerbWeight"
              type="number"
              value={vehicle.kerbWeight}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fuel Tank Capacity (liters)"
              name="fuelTankCapacity"
              type="number"
              value={vehicle.fuelTankCapacity}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Seat Height (mm)"
              name="seatHeight"
              type="number"
              value={vehicle.seatHeight}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Button variant="contained" type="submit" fullWidth>
              Add Vehicle
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddVehicle;