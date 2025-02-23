import VehicleModel from "../models/vehicle.model.js";

// Route to add a new vehicle
const addReviewController = async (req, res) => {
    try {
      const { rating, comment } = req.body;

      if(!req.params.vehicleId){
        res.status(500).json({ message: "Please, provide complete information params!!" });
        return;
      }

      if(!rating ){
        res.status(500).json({ message: "Please, provide complete information rating!!" });
        return;
      }

      if(!comment){
        res.status(500).json({ message: "Please, provide complete information!!" });
        return;
      }

      const vehicle = await VehicleModel.findById(req.params.vehicleId);
  
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      // Add the review
      const review = {
        userName: req.userDetails.name || "Unknown",
        rating: Number(rating),
        comment
      };
  
      vehicle.reviews.push(review);
  
      // Update average rating
      vehicle.averageRating =
        vehicle.reviews.reduce((acc, item) => acc + item.rating, 0) /
        vehicle.reviews.length;
  
      await vehicle.save();
      res.status(201).json({success: true, newReview : review,  message: "Review added successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

export default addReviewController;