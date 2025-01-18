import VehicleModel from "../models/vehicle.model.js";

// Route to get all vehicles
const getAllVehiclesController = async (req , res)=>{
    try{

        const vehicles = await VehicleModel.find();
        
        console.log("fetched successfully!!");

        return res.status(200).json({success:true , "vehicles" : vehicles});
    }
    catch(error){
        return res.status(500).json({success : false , vehicles : []});
    }
};

export default getAllVehiclesController;
