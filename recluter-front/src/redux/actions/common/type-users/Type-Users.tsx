import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import { 
    FETCH_TYPE_USERS_REQUEST,
    FETCH_TYPE_USERS_SUCCESS,
    FETCH_TYPE_USERS_FAILURE,
    CREATE_TYPE_USERS_REQUEST,
    CREATE_TYPE_USERS_SUCCESS,
    CREATE_TYPE_USERS_FAILURE,
    FETCH_TYPE_USERS_TABLE, 
    TypeUsersActionTypes
} from '../../../../constants/common/type-users/Type-Users';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchTypeUsersRequestReducer = ():TypeUsersActionTypes => ({
  type: FETCH_TYPE_USERS_REQUEST,
});

export const fetchTypeUsersSuccessReducer = (data: any[]): TypeUsersActionTypes => ({
  type: FETCH_TYPE_USERS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchTypeUsersTableReducer = (data: any[], meta: any): TypeUsersActionTypes => ({
  type: FETCH_TYPE_USERS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const fetchTypeUsersFailureReducer = (error: string): TypeUsersActionTypes => ({
  type: FETCH_TYPE_USERS_FAILURE,
  payload: error,
});

export const createTypeUsersRequest = (): TypeUsersActionTypes => ({
  type: CREATE_TYPE_USERS_REQUEST,
});

export const createTypeUsersSuccess = (data: any): TypeUsersActionTypes => ({
  type: CREATE_TYPE_USERS_SUCCESS,
  payload: data,
});

export const createTypeUsersFailure = (error: string): TypeUsersActionTypes => ({
  type: CREATE_TYPE_USERS_FAILURE,
  payload: error,
});

export const GetTypeUsersReducer = (
//   search: string = '',
//   page: number = 1,
//   limit: number = 10
): ThunkAction<Promise<any>, RootState, unknown, TypeUsersActionTypes> => async (dispatch) => {
  dispatch(fetchTypeUsersRequestReducer());

  try {
    // const response = await fetch(`${API_URL}aptitudes?aptitud=${search}&page=${page}&limit=${limit}&sortColumn=aptitud&sortOrder=asc`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    const response = await fetch(`${API_URL}tipo-usuarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    console.log('responseData:', responseData)

    if (responseData.data) {
      dispatch(fetchTypeUsersSuccessReducer(responseData.data));  
      return {
        payload: {
          data: responseData.data,
          meta: responseData.meta,
        }
      };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchTypeUsersFailureReducer('Error al mostrar datos'));
  }
};





// export const GetTypeUsersTableReducer = (
//   search: string = '',
//   page: number = 1,
//   limit: number = 10
// ): ThunkAction<Promise<any>, RootState, unknown, TypeUsersActionTypes> => async (dispatch) => {
//   dispatch(fetchTypeUsersRequestReducer());

//   try {
//     const response = await fetch(`${API_URL}aptitudes?aptitud=${search}&page=${page}&limit=${limit}&sortColumn=createdAt&sortOrder=desc`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error HTTP: ${response.status}`);
//     }

//     const responseData = await response.json();

//     if (Array.isArray(responseData.data)) {
//       dispatch(fetchTypeUsersTableReducer(responseData.data, responseData.meta));
//       return {
//         payload: {
//           data: responseData.data,
//           meta: responseData.meta,
//         }
//       };
//     } else {
//       throw new Error('Los datos obtenidos no son un array');
//     }

//   } catch (error) {
//     dispatch(fetchTypeUsersFailureReducer('Error al mostrar datos'));
//     return { payload: { data: [] } };
//   }
// };

export const CreateTypeUsersReducer = (TypeUsersData: any): ThunkAction<Promise<any>, RootState, unknown, TypeUsersActionTypes> => async (dispatch) => {
  dispatch(createTypeUsersRequest());
  
  try {
    const response = await fetch(`${API_URL}tipo-usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TypeUsersData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createTypeUsersSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createTypeUsersSuccess('Error al crear el Skill'));
    throw error;
  }
};
