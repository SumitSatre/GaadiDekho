import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: '',
    subcategory: ''
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
    const { name, image, description, price, category, subcategory } = vehicle;
    if (!name || !image || !description || !price || !category || !subcategory) {
      setError('All fields are required.');
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
          price: '',
          category: '',
          subcategory: ''
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

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={vehicle.price}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Category Selection */}
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
