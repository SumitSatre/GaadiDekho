import express from "express";
import vehicleRoutes from "./routes/vehicle.route.js";
import userRoutes from "./routes/user.routes.js";

// It should be declared at the start then it works for entire project
// It is used to load environment variables from a specific configuration file
import dotenv from "dotenv";
dotenv.config({path : "./config/config.env"});

// Connecting to the database
import mongodb from "./config/db.js";
mongodb();

const app = express();
app.use(express.json());    // It is used to parse incoming requests with JSON payloads

// It is middleware whch allows the specified server to access the backend server 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // You can replace '*' with your frontend URL for production
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow necessary methods
  
    // Allow CORS preflight request (OPTIONS) to proceed
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    next();
  });

// dummy Route
app.get('/' , (req , res)=>{
  res.send("Your backend is running successfully!");
})

// Routed Imported 

// Routes used
app.use("/api/v1" , vehicleRoutes );
app.use("/api/v1" , userRoutes);

// It  is used to start a server that listens on port mentioned in confuguration file

app.listen(process.env.PORT , ()=>{
    console.log(`Working at http://localhost:${process.env.PORT}/`)
});
