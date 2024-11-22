import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { ValidateTokenAuthReducer } from '../redux/actions/auth/Auth';
import { VALIDATE_USER_AUTH } from '../constants/auth/Auth';

const AuthRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_validate_user,
    rex_user
  } = useSelector(({ auth }: any) => auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!rex_user) {
        dispatch(ValidateTokenAuthReducer())
      }
    } else {
      navigate('/home');
      dispatch({
        type: VALIDATE_USER_AUTH,
        payload: true
      })
    }
  }, []);

  return rex_validate_user ? <Outlet /> : <></>;
  // return <Outlet />;
};

export default AuthRoute;
