import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
    FETCH_PERMISSIONS_TYPE_USER_REQUEST,
    FETCH_PERMISSIONS_TYPE_USER_SUCCESS,
    FETCH_PERMISSIONS_TYPE_USER_FAILURE,
    FETCH_TYPE_PERMISSION_REQUEST,
    FETCH_TYPE_PERMISSION_SUCCESS,
    FETCH_TYPE_PERMISSION_FAILURE,
    CREATE_PERMISSIONS_USER_REQUEST,
    CREATE_PERMISSIONS_USER_SUCCESS,
    CREATE_PERMISSIONS_USER_FAILURE,
    CREATE_TYPE_PERMISSIONS_USER_REQUEST,
    CREATE_TYPE_PERMISSIONS_USER_SUCCESS,
    CREATE_TYPE_PERMISSIONS_USER_FAILURE,
    CREATE_UPDATE_PERMISSIONS_USER_REQUEST,
    CREATE_UPDATE_PERMISSIONS_USER_SUCCESS,
    CREATE_UPDATE_PERMISSIONS_USER_FAILURE,
    PermissionsTypeUserActionTypes
} from '../../../../constants/common/permissions/PermissionsTypeUser';

interface CreatePermisosUsuario {
    permiso_id: number[];
    tipo_usuario_id: number;
}

interface CreatePermisoFormData {
    slug: string;
    ruta: string;
    descripcion: string;
    tipo_permiso_id: number;
}

interface CreateTypePermisoFormData {
    tipo: string;
}



const API_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPermissionsTypeUserRequestReducer = (): PermissionsTypeUserActionTypes => ({
    type: FETCH_PERMISSIONS_TYPE_USER_REQUEST,
});

export const fetchPermissionsTypeUserSuccessReducer = (data: any[]): PermissionsTypeUserActionTypes => ({
    type: FETCH_PERMISSIONS_TYPE_USER_SUCCESS,
    payload: { data },
});

export const fetchPermissionsTypeUserFailureReducer = (error: string): PermissionsTypeUserActionTypes => ({
    type: FETCH_PERMISSIONS_TYPE_USER_FAILURE,
    payload: error,
});

export const fetchTypePermissionRequestReducer = (): PermissionsTypeUserActionTypes => ({
    type: FETCH_TYPE_PERMISSION_REQUEST,
});

export const fetchTypePermissionSuccessReducer = (data: any[]): PermissionsTypeUserActionTypes => ({
    type: FETCH_TYPE_PERMISSION_SUCCESS,
    payload: { data },
});

export const fetchTypePermissionFailureReducer = (error: string): PermissionsTypeUserActionTypes => ({
    type: FETCH_TYPE_PERMISSION_FAILURE,
    payload: error,
});

export const createPermissionsTypeUserRequestReducer = (): PermissionsTypeUserActionTypes => ({
    type: CREATE_PERMISSIONS_USER_REQUEST,
});

export const createPermissionsTypeUserSuccessReducer = (data: any[]): PermissionsTypeUserActionTypes => ({
    type: CREATE_PERMISSIONS_USER_SUCCESS,
    payload: { data },
});

export const createPermissionsTypeUserFailureReducer = (error: string): PermissionsTypeUserActionTypes => ({
    type: CREATE_PERMISSIONS_USER_FAILURE,
    payload: error,
});

export const createTypePermissionsUserRequestReducer = (): PermissionsTypeUserActionTypes => ({
    type: CREATE_TYPE_PERMISSIONS_USER_REQUEST,
});

export const createTypePermissionsUserSuccessReducer = (data: any[]): PermissionsTypeUserActionTypes => ({
    type: CREATE_TYPE_PERMISSIONS_USER_SUCCESS,
    payload: { data },
});

export const createTypePermissionsUserFailureReducer = (error: string): PermissionsTypeUserActionTypes => ({
    type: CREATE_TYPE_PERMISSIONS_USER_FAILURE,
    payload: error,
});

export const createUpdatePermissionsTypeUserRequestReducer = (): PermissionsTypeUserActionTypes => ({
    type: CREATE_UPDATE_PERMISSIONS_USER_REQUEST,
});

export const createUpdatePermissionsTypeUserSuccessReducer = (data: any[]): PermissionsTypeUserActionTypes => ({
    type: CREATE_UPDATE_PERMISSIONS_USER_SUCCESS,
    payload: { data },
});

export const createUpdatePermissionsTypeUserFailureReducer = (error: string): PermissionsTypeUserActionTypes => ({
    type: CREATE_UPDATE_PERMISSIONS_USER_FAILURE,
    payload: error,
});



export const GetPermissionsTypeUserReducer = (userId: number):
    ThunkAction<Promise<any>, RootState, unknown, PermissionsTypeUserActionTypes> => async (dispatch) => {
        dispatch(fetchPermissionsTypeUserRequestReducer());

        try {
            const response = await fetch(`${API_URL}permisos/permisos-tipos-usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Datos de la API de soft skills:", responseData);
            if (Array.isArray(responseData.data)) {
                dispatch(fetchPermissionsTypeUserSuccessReducer(responseData.data));
                return { payload: { data: responseData.data } };
            } else {
                throw new Error('Los datos obtenidos no son un array');
            }

        } catch (error) {
            dispatch(fetchPermissionsTypeUserFailureReducer('Error al mostrar datos'));
            return { payload: { data: [] } };
        }
    };

export const GetTypePermissionReducer = ():
    ThunkAction<Promise<any>, RootState, unknown, PermissionsTypeUserActionTypes> => async (dispatch) => {
        dispatch(fetchTypePermissionRequestReducer());

        try {
            const response = await fetch(`${API_URL}tipo-permisos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Datos de la API de tipos de permisos:", responseData);
            if (Array.isArray(responseData.data)) {
                dispatch(fetchTypePermissionSuccessReducer(responseData.data));
                return { payload: { data: responseData.data } };
            } else {
                throw new Error('Los datos obtenidos no son un array');
            }

        } catch (error) {
            dispatch(fetchPermissionsTypeUserFailureReducer('Error al mostrar datos'));
            return { payload: { data: [] } };
        }
    };

export const createOrUpdatePermisosUsuario = (create: CreatePermisosUsuario):
    ThunkAction<Promise<any>, RootState, unknown, PermissionsTypeUserActionTypes> => async (dispatch) => {
        dispatch(createUpdatePermissionsTypeUserRequestReducer);

        try {
            const response = await fetch(`${API_URL}permisos/createPermisoTipoUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(create),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.respuesta) {
                dispatch(createUpdatePermissionsTypeUserSuccessReducer(data));
                console.log('Permisos actualizados:', data.data);
            } else {
                throw new Error('Los datos obtenidos no son un array');
            }
        } catch (error) {
            dispatch(createUpdatePermissionsTypeUserFailureReducer('Error al mostrar datos'));
            return { payload: { data: [] } };
        }
    };

export const CreatePermisoReducer = (formData: CreatePermisoFormData):
    ThunkAction<Promise<any>, RootState, unknown, PermissionsTypeUserActionTypes> => async (dispatch) => {
        dispatch(createPermissionsTypeUserRequestReducer());

        try {
            const response = await fetch(`${API_URL}permisos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.respuesta) {
                dispatch(createPermissionsTypeUserSuccessReducer(data));
                console.log('Permiso creado:', data.data[0]);
                return data.data[0];
            } else {
                throw new Error('Los datos obtenidos no son un array');
            }
        } catch (error) {
            dispatch(createPermissionsTypeUserFailureReducer('Error al mostrar datos'));
            throw error;
        }
    };

export const CreateTypePermisoReducer = (formData: CreateTypePermisoFormData):
    ThunkAction<Promise<any>, RootState, unknown, PermissionsTypeUserActionTypes> => async (dispatch) => {
        dispatch(createTypePermissionsUserRequestReducer());

        try {
            const response = await fetch(`${API_URL}tipo-permisos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.respuesta) {
                dispatch(createTypePermissionsUserSuccessReducer(data));
                console.log('Tipo de Permiso creado:', data.data[0]);
                return data.data[0];
            } else {
                throw new Error('Los datos obtenidos no son un array');
            }
        } catch (error) {
            dispatch(createTypePermissionsUserFailureReducer('Error al mostrar datos'));
            throw error;
        }
    };