
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('token');

    alert('Logged out successfully');

    
    navigate('/login');
  }, [navigate]);

  return null; 
}

export default Logout;
