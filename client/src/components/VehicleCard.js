import React from 'react';
import { useDispatch, useSelector } from "react-redux";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="card" style={styles.card}>
      <img src={vehicle.image} alt={vehicle.name} className="card-img-top" style={styles.image} />
      <div className="card-body">
        <h5 className="card-title" style={styles.name}>{vehicle.name}</h5>
        <p className="card-text" style={styles.description}>{vehicle.description}</p>
        <p className="card-text" style={styles.price}>₹{vehicle.price}</p>
      </div>
    </div>
  );
};

const VehicleList = ({ vehicles }) => {
  // Access category and subcategory from the Redux store
  const { category, subcategory } = useSelector((state) => state.category);

  // Filter vehicles based on category and subcategory
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Check if the vehicle matches the selected category and subcategory
    const categoryMatch = category ? vehicle.category === category : true;
    const subcategoryMatch =
      subcategory && subcategory !== "All" ? vehicle.subcategory === subcategory : true;

    return categoryMatch && subcategoryMatch;
  });

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" style={styles.container}>
      {filteredVehicles.length > 0 ? (
        filteredVehicles.map((vehicle) => (
          <div className="col" key={vehicle._id}>
            <VehicleCard vehicle={vehicle} />
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', margin: '20px' }}>
          No vehicles found for the selected category and subcategory.
        </p>
      )}
    </div>
  );
};


const styles = {
  container: {
    marginTop: '20px',
  },
  card: {
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00b300',
  },
};

export default VehicleList;
