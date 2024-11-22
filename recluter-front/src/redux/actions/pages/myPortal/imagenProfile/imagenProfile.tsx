// src/actions/pages/myPortal/education/UpdateEducation.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
    UPDATE_IMAGEN_REQUEST,
    UPDATE_IMAGEN_SUCCESS,
    UPDATE_IMAGEN_FAILURE,
    UpdateImagenActionTypes
} from '../../../../../constants/pages/myPortal/imagen/UpdateImagen';
import {
    UPDATE_IMAGEN_BANNER_REQUEST,
    UPDATE_IMAGEN_BANNER_SUCCESS,
    UPDATE_IMAGEN_BANNER_FAILURE,
    UpdateImagenBannerActionTypes
} from '../../../../../constants/pages/myPortal/imagen_banner/UpdateImagenBanner';
import FetchWithIP from '../../../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const updateImagenRequest = (): UpdateImagenActionTypes => ({
    type: UPDATE_IMAGEN_REQUEST
});

export const updateImagenSuccess = (data: any): UpdateImagenActionTypes => ({
    type: UPDATE_IMAGEN_SUCCESS,
    payload: data
});

export const updateImagenFailure = (error: string): UpdateImagenActionTypes => ({
    type: UPDATE_IMAGEN_FAILURE,
    payload: error
})

export const updateImagenBannerRequest = (): UpdateImagenBannerActionTypes => ({
    type: UPDATE_IMAGEN_BANNER_REQUEST
});

export const updateImagenBannerSuccess = (data: any): UpdateImagenBannerActionTypes => ({
    type: UPDATE_IMAGEN_BANNER_SUCCESS,
    payload: data
});

export const updateImagenBannerFailure = (error: string): UpdateImagenBannerActionTypes => ({
    type: UPDATE_IMAGEN_BANNER_FAILURE,
    payload: error
});


export const UpdateImagenReducer = (
    file: File // Cambia esto a recibir un archivo directamente
): ThunkAction<Promise<{ success: boolean; data?: any; message?: string }>, RootState, unknown, UpdateImagenActionTypes> => async (dispatch) => {
    dispatch(updateImagenRequest());
    
    try {
        const formData = new FormData();
        formData.append('imagen', file); // Agrega la imagen al FormData

        if (!file || file.size === 0) {
            return { success: false, message: 'El archivo está vacío o no es válido.' };
        }

        const response = await FetchWithIP(
            'auth/uploadImagen',
            { method: 'PUT' },
            formData
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();

        dispatch(updateImagenSuccess(responseData.data));

        return { success: true, data: responseData.data };

    } catch (error: any) {
        dispatch(updateImagenFailure(error.message || 'Error al actualizar la imagen'));
        return { success: false, message: error.message || 'Error al actualizar la imagen' };
    }
};

export const UpdateImagenBannerReducer = (
    file: File // Cambia esto a recibir un archivo directamente
): ThunkAction<Promise<any>, RootState, unknown, UpdateImagenBannerActionTypes> => async (dispatch) => {
    dispatch(updateImagenBannerRequest());
    console.log("file:", file)
    try {
        const formData = new FormData();
        formData.append('imagen_banner', file); // Agrega la imagen al FormData
        if (!file || file.size === 0) {
            console.log('El archivo es nulo o vacío');
            return; // O maneja el error según sea necesario
        }
        const imagenFile = formData.get('imagen_banner');
        if (imagenFile instanceof File) {
            console.log('Nombre del archivo:', imagenFile.name);
        } else {
            console.log('No se encontró el archivo en FormData');
        }

        const response = await FetchWithIP(
            'auth/uploadImagenBanner',
            { method: 'PUT' },
            formData
        );


        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();


        dispatch(updateImagenBannerSuccess(responseData.data));

        return { success: true, data: responseData.data };

    } catch (error: any) {
        dispatch(updateImagenBannerFailure(error.message || 'Error al actualizar el banner'));
        return { success: false, message: error.message || 'Error al actualizar el banner' };
    }
};

