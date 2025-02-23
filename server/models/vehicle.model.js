import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      default: "Unknown"
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


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
    default: "",
  },
  priceMin: {
    type: Number,
    required: true,
    min: [0, "Minimum price cannot be negative."], // Minimum value is 0
  },
  priceMax: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure priceMax is greater than or equal to priceMin
        return value >= this.priceMin;
      },
      message: "Maximum price must be greater than or equal to minimum price.",
    },
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
  engineCapacity: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  kerbWeight: {
    type: Number,
    required: true,
  },
  fuelTankCapacity: {
    type: Number,
    required: true,
  },
  seatHeight: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],

  // Average Rating
  averageRating: {
    type: Number,
    default: 0,
  },

});

const VehicleModel = mongoose.model("Vehicles", productSchema);

export default VehicleModel;