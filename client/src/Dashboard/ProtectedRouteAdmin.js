import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import AuthToken from '../helper/AuthToken';

export default function ProtectedRouteAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const UserEmail = AuthToken.getEmail(); // Replace with your auth logic
  const token = AuthToken.getToken(); // Replace with your auth logic

  useEffect(() => {
    if (UserEmail && token) {
      fetchUserData(token);
    } else {
      setIsLoading(false); // If no email or token, stop loading
    }
  }, [UserEmail, token]);

  const fetchUserData = async (token) => {
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:4001/api/v1/user/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch user data');
      }

      if (responseData.success && responseData.data.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred while fetching user data');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Navigate to home page if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render protected component for admins
  return <Outlet />;
}
