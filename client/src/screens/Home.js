import React from 'react'
import Navbar from '../components/Navbar'
import ChooseVehicleTypeBar from '../components/ChooseVehicleTypeBar';
import VehicleList from '../components/VehicleCard';

const Home = () => {

  const cars = [
    {
      id: 1,
      name: 'Tesla Model 3',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'An electric car with incredible performance and range.',
      price: 39999,
    },
    {
      id: 2,
      name: 'Ford Mustang',
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A powerful muscle car with classic American styling.',
      price: 55999,
    },
    // Add more cars as needed
  ];

  return (
    <div>
        <Navbar />
        <ChooseVehicleTypeBar /> 
        <VehicleList vehicles={cars} />
    </div>
  )
}

export default Home;