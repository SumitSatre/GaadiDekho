import express from "express";

const router = express.Router();
import vehicleAddController from "../controllers/vehicleAdd.controller.js";
import getAllVehiclesController from "../controllers/getAllVehicles.controller.js";
import addReviewController from "../controllers/addReview.controller.js";
import protect from "../middlewares/authenticateUser.middleware.js";

router.post("/add/vehicle" , vehicleAddController);
router.get("/get/vehicles" , getAllVehiclesController);
router.post("/add/review/:vehicleId" ,protect, addReviewController);

export default router;