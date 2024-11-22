import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  CREATE_APTITUD_USUARIO_REQUEST,
  CREATE_APTITUD_USUARIO_SUCCESS,
  CREATE_APTITUD_USUARIO_FAILURE,
  CreateAptitudUsuarioActionTypes
} from '../../../../../constants/pages/myPortal/aptitudes/PostAptitud';
import FetchWithIP from '../../../utils/FetchHeaders';

interface AptitudData {
  aptitud_id: number;
}

export const CreateAptitudUsuarioReducer = (
  aptitud: AptitudData
): ThunkAction<Promise<any>, RootState, unknown, CreateAptitudUsuarioActionTypes> => async (dispatch) => {
  dispatch({ type: CREATE_APTITUD_USUARIO_REQUEST });

  try {
    // Asegurarse de que aptitud_id sea un número
    const aptitudToSend = {
      aptitud_id: Number(aptitud.aptitud_id)
    };

    console.log("Sending data to API:", aptitudToSend);

    const response = await FetchWithIP('aptitudes-usuarios', {
      method: 'POST'},
      aptitudToSend
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    dispatch({ type: CREATE_APTITUD_USUARIO_SUCCESS, payload: data });
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch({ type: CREATE_APTITUD_USUARIO_FAILURE, payload: errorMessage });
    throw error;
  }
};