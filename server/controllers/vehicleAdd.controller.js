import VehicleModel from "../models/vehicle.model.js";

// Route to add a new vehicle
const vehicleAddController = async (req, res) => {
  try {
    // Extract data from the request body
    const {  name, image, description, price, category, subcategory } = req.body;

    // Validate request body
    if (!name || !image || !price || !category || !subcategory) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new vehicle instance
    const newVehicle = new VehicleModel({
      name,
      image,
      description,
      price,
      category,
      subcategory,
    });

    // Save the vehicle to the database
    await newVehicle.save();

    // Respond with success
    res.status(201).json({success : true , message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    // Handle errors
    console.error("Error adding vehicle:", error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({success : false , message: error.message });
    }
    res.status(500).json({success : false , message: "Internal Server Error" });
  }
};


export default vehicleAddController;
