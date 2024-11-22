import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { ValidateTokenAuthReducer } from '../redux/actions/auth/Auth';
// import { LoginAuthReducer } from '../redux/actions/auth/Auth';

const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    rex_validate_user
  } = useSelector(({ auth }: any) => auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // dispatch(ValidateTokenAuthReducer())
    }
  }, [rex_validate_user]);

  return <Outlet />;
};

export default ProtectedRoute;
