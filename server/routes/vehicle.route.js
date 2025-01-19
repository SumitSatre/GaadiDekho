import express from "express";

const router = express.Router();
import vehicleAddController from "../controllers/vehicleAdd.controller.js";
import getAllVehiclesController from "../controllers/getAllVehicles.controller.js";

router.post("/add/vehicle" , vehicleAddController);
router.get("/get/vehicles" , getAllVehiclesController);

export default router;