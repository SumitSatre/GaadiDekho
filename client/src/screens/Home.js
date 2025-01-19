import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChooseVehicleTypeBar from '../components/ChooseVehicleTypeBar';
import VehicleList from '../components/VehicleCard';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/get/vehicles');
        console.log(response);
        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVehicles(data.vehicles);
      } catch (err) {
        setError(err.message);
      } finally {
       setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <ChooseVehicleTypeBar />
      <VehicleList vehicles={vehicles} loading={loading} />
    </div>
  );
};

export default Home;
