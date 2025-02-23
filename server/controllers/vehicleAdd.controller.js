import VehicleModel from "../models/vehicle.model.js";

// Route to add a new vehicle
const vehicleAddController = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      image,
      description,
      priceMin,
      priceMax,
      category,
      subcategory,
      engineCapacity,
      mileage,
      transmission,
      kerbWeight,
      fuelTankCapacity,
      seatHeight,
    } = req.body;

    // Validate request body
    if (
      !name ||
      !image ||
      !priceMin ||
      !priceMax ||
      !category ||
      !subcategory ||
      !engineCapacity ||
      !mileage ||
      !transmission ||
      !kerbWeight ||
      !fuelTankCapacity ||
      !seatHeight
    ) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate price range
    if (parseFloat(priceMax) < parseFloat(priceMin)) {
      return res.status(400).json({ success: false, message: "Maximum price must be greater than or equal to minimum price." });
    }

    // Create a new vehicle instance
    const newVehicle = new VehicleModel({
      name,
      image,
      description,
      priceMin,
      priceMax,
      category,
      subcategory,
      engineCapacity,
      mileage,
      transmission,
      kerbWeight,
      fuelTankCapacity,
      seatHeight,
    });

    // Save the vehicle to the database
    await newVehicle.save();

    // Respond with success
    res.status(201).json({ success: true, message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    // Handle errors
    console.error("Error adding vehicle:", error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default vehicleAddController;