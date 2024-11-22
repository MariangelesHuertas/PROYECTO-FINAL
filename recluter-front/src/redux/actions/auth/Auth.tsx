import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  GET_DATA_USER_LOGIN_AUTH,
  VALIDATE_USER_AUTH
} from '../../../constants/auth/Auth';
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const LoginAuthReducer = (
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

      const data = await fetch(API_URL + 'auth/login', {
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

export const RegisterAuthReducer = (
  values: {
    nombre: string,
    email: string,
    contrasena: string
  }): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch) => {

    try {

      const data = await fetch(API_URL + 'auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "nombre": values.nombre,
          "apellido_paterno": "",
          "apellido_materno": "",
          "usuario": values.email,
          "email": values.email,
          "contrasena": values.contrasena,
          "tipo_usuario_id": 1
        }),
      }).then(res => res.json());

      // if (data.respuesta) {
      //   dispatch({
      //     type: GET_DATA_USER_LOGIN_AUTH,
      //     payload: data.data[0].user,
      //   });
      //   localStorage.setItem('token', data.data[0].token)
      // }

      return data

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      localStorage.clear()
      throw error;
    }
  };

export const ValidateTokenAuthReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  try {

    dispatch({
      type: VALIDATE_USER_AUTH,
      payload: false
    })

    const data = await fetch(API_URL + 'auth/validateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      }),
    }).then(res => res.json());

    if (data.data.length > 0) {
      dispatch({
        type: GET_DATA_USER_LOGIN_AUTH,
        payload: data.data[0].user,
      });
      localStorage.setItem('token', data.data[0].token)
    }else{
      localStorage.clear();
    }

    return data

  } catch (error) {
    console.error('Error al iniciar sesión', error);
    localStorage.clear()
    throw error;
  }
};