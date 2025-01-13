import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: 'white',
      }}
    >
      {/* Logo and Website Name */}
      <a
        className="navbar-brand d-flex align-items-center text-white fw-bold"
        href="/"
        style={{ fontSize: '1.5rem' }}
      >
        <img
          src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Logo"
          className="me-2"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid white',
          }}
        />
        MyWebsite
      </a>

      {/* Search Button and Input */}
      <div className="d-flex align-items-center ms-auto">
        <button
          className="btn btn-light text-primary me-2"
          onClick={toggleSearch}
          style={{
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '5px 15px',
          }}
        >
          {showSearch ? 'Close' : 'Search'}
        </button>
        {showSearch && (
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            style={{
              width: '200px',
              border: '2px solid #2575fc',
              borderRadius: '20px',
              padding: '5px 10px',
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
