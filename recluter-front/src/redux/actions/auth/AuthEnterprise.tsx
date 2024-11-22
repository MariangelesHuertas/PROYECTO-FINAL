import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';

import {
  GET_DATA_USER_LOGIN_AUTH,
  VALIDATE_USER_AUTH
} from '../../../constants/auth/Auth';
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const LoginEnterpriseAuthReducer = (
  values: {
    usuario: string,
    contrasena: string
  }): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch) => {

    try {

      const data = await fetch(API_URL + 'empresas/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }).then(res => res.json());

      if (data.respuesta) {
        dispatch({
          type: GET_DATA_USER_LOGIN_AUTH,
          payload: data.data[0].user,
        });
        localStorage.setItem('token', data.data[0].token)
      }

      return data

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      localStorage.clear()
      throw error;
    }
  };