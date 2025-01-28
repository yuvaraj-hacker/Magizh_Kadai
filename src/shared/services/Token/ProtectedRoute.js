import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../store/useAuth';
import { getuserdetails } from './token';

const ProtectedRoute = ({children, allowedRoles }) => {
  const navigate=useNavigate()
  const { isLoggedIn } = useAuth();
  const userRole = getuserdetails() ? getuserdetails().Role : false;
  useEffect(() => {
    if (!isLoggedIn || !allowedRoles?.includes(userRole)) {
      navigate('/');
    }
  }, [isLoggedIn, allowedRoles, userRole, navigate]);
  return children;
};

export default ProtectedRoute;