import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/ChooseVehicleTypeBar.css"; // Use for additional styling
import { Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import { CHANGE_CATEGORY } from "../slices/CategorySlice.js"; // Adjust the import path based on your file structure

const ChooseVehicleTypeBar = () => {
  const dispatch = useDispatch();
  const { category, subcategory } = useSelector((state) => state.category); // Access Redux state

  const options = {
    Bikes: ["All", "Mountain Bike", "Road Bike", "Hybrid Bike"],
    Cars: ["All", "SUV", "Sedan", "Hatchback"],
    Scooters: ["All", "Electric Scooter", "Kick Scooter"],
    Trucks: ["All", "Pickup Truck", "Semi Truck"],
  };

  const handleSelect = (mainOption, subOption) => {
    // Ensure selected sub-option is valid for the main option
    if (!options[mainOption].includes(subOption)) {
      subOption = "All";
    }

    // Dispatch the action to update category and subcategory in Redux
    dispatch(CHANGE_CATEGORY({ category: mainOption, subcategory: subOption }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-3 bg-light shadow-sm">
      {Object.keys(options).map((option) => (
        <Dropdown key={option} className="position-relative">
          {/* Main Option Button */}
          <DropdownButton
            variant={category === option ? "primary" : "secondary"} // Highlight the selected option
            id={`${option}-dropdown`}
            title={category === option ? `${option} (${subcategory})` : option}
            onSelect={(subOption) => handleSelect(option, subOption)} // Update category and subcategory
            style={{
              minWidth: "150px",
              cursor: "pointer",
              fontWeight: category === option ? "bold" : "normal", // Bold the selected option
            }}
          >
            {/* Dropdown Items */}
            {options[option].map((subOption) => (
              <Dropdown.Item
                key={subOption}
                active={subcategory === subOption} // Highlight selected sub-option
                eventKey={subOption}
                style={{
                  transition: "background-color 0.2s ease",
                }}
              >
                {subOption}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Dropdown>
      ))}
    </div>
  );
};

export default ChooseVehicleTypeBar;
