import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/ChooseVehicleTypeBar.css"; // Add your custom CSS if needed
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { CHANGE_CATEGORY } from "../slices/CategorySlice.js"; // Adjust the import path

const ChooseVehicleTypeBar = () => {
  const dispatch = useDispatch();
  const { category, subcategory } = useSelector((state) => state.category);

  const options = {
    Bikes: ["All", "Mountain Bike", "Road Bike", "Hybrid Bike"],
    Cars: ["All", "SUV", "Sedan", "Hatchback"],
    Scooters: ["All", "Electric Scooter", "Kick Scooter"],
    Trucks: ["All", "Pickup Truck", "Semi Truck"],
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleMenuOpen = (event, option) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(option);
  };

  const handleMenuClose = (subOption) => {
    if (subOption && selectedCategory) {
      dispatch(
        CHANGE_CATEGORY({ category: selectedCategory, subcategory: subOption })
      );
    }
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
        px: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(options).map((option) => (
          <Grid item key={option}>
            <Button
              variant={category === option ? "contained" : "outlined"}
              color={category === option ? "primary" : "inherit"}
              endIcon={<ArrowDropDown />}
              onClick={(event) => handleMenuOpen(event, option)}
              sx={{
                minWidth: 150,
                textTransform: "capitalize",
                fontWeight: category === option ? "bold" : "normal",
                "&:hover": {
                  bgcolor: category === option ? "primary.dark" : "grey.300",
                },
              }}
            >
              {category === option ? `${option} (${subcategory})` : option}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={selectedCategory === option}
              onClose={() => handleMenuClose()}
              PaperProps={{
                style: {
                  maxHeight: 200,
                  width: "20ch",
                },
              }}
            >
              {options[option].map((subOption) => (
                <MenuItem
                  key={subOption}
                  selected={subcategory === subOption}
                  onClick={() => handleMenuClose(subOption)}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.light",
                      color: "white",
                    },
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  {subOption}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ChooseVehicleTypeBar;
