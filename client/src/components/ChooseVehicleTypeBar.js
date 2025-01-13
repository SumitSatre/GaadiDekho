import React, { useState } from "react";
import "../Css/ChooseVehicleTypeBar.css"; // Use for additional styling
import { Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";

const ChooseVehicleTypeBar = () => {
  const [selectedOption, setSelectedOption] = useState("Bikes"); // Track selected main option
  const [selectedSubOption, setSelectedSubOption] = useState("All"); // Track selected sub-option

  const options = {
    Bikes: ["All", "Mountain Bike", "Road Bike", "Hybrid Bike"],
    Cars: ["All", "SUV", "Sedan", "Hatchback"],
    Scooters: ["All", "Electric Scooter", "Kick Scooter"],
    Trucks: ["All", "Pickup Truck", "Semi Truck"],
  };

  const handleSelect = (mainOption, subOption) => {
    // Check if the selected subOption is part of the mainOption's options
    if (!options[mainOption].includes(subOption)) {
      subOption = "All"; 
      console.log("This is triggered");
    }
  
    // Set the main option and the sub-option when one is selected
    setSelectedOption(mainOption);
    setSelectedSubOption(subOption);
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-3 bg-light shadow-sm">
      {Object.keys(options).map((option) => (
        <Dropdown key={option} className="position-relative">
          {/* Main Option Button */}
          <DropdownButton
            variant={selectedOption === option ? "primary" : "secondary"} // Highlight the selected option
            id={`${option}-dropdown`}
            title={selectedOption === option ? `${option} (${selectedSubOption})` : option}
            onSelect={(subOption) => handleSelect(option, subOption)} // Set the sub-option when selected
            style={{
              minWidth: "150px",
              cursor: "pointer",
              fontWeight: selectedOption === option ? "bold" : "normal", // Bold the selected option
            }}
          >
            {/* Dropdown Items */}
            {options[option].map((subOption) => (
              <Dropdown.Item
                key={subOption}
                active={subOption === selectedSubOption} // Highlight selected sub-option
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
