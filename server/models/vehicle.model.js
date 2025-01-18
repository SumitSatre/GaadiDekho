import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Bikes", "Cars", "Scooters", "Trucks"], // Allowed categories
  },
  subcategory: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate subcategory based on category
        const options = {
          Bikes: ["All", "Mountain Bike", "Road Bike", "Hybrid Bike"],
          Cars: ["All", "SUV", "Sedan", "Hatchback"],
          Scooters: ["All", "Electric Scooter", "Kick Scooter"],
          Trucks: ["All", "Pickup Truck", "Semi Truck"],
        };
        return options[this.category]?.includes(value);
      },
      message: (props) =>
        `${props.value} is not a valid subcategory for category ${props.instance.category}`,
    },
  },
});

const VehicleModel = mongoose.model('Vehicles', productSchema);

export default VehicleModel;