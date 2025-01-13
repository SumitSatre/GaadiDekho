import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="card" style={styles.card}>
      <img src={vehicle.image} alt={vehicle.name} className="card-img-top" style={styles.image} />
      <div className="card-body">
        <h5 className="card-title" style={styles.name}>{vehicle.name}</h5>
        <p className="card-text" style={styles.description}>{vehicle.description}</p>
        <p className="card-text" style={styles.price}>${vehicle.price}</p>
      </div>
    </div>
  );
};

const VehicleList = ({ vehicles }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" style={styles.container}>
      {vehicles.map((vehicle) => (
        <div className="col" key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
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
