// src/actions/pages/myPortal/valuation/editValuationLinkActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  EDIT_VALUATION_LINK_REQUEST,
  EDIT_VALUATION_LINK_SUCCESS,
  EDIT_VALUATION_LINK_FAILURE,
  EditValuationLinkActionTypes,
} from '../../../../../constants/pages/myPortal/QR/EditValuationLink';
import FetchWithIP from '../../../utils/FetchHeaders';

export const editValuationLinkReducer = (newLink: string): ThunkAction<Promise<any>, RootState, unknown, EditValuationLinkActionTypes> => async (dispatch) => {
  dispatch({ type: EDIT_VALUATION_LINK_REQUEST });

  try {
    const response = await FetchWithIP('auth/updateFieldLinkValoracion', {
      method: 'PATCH'},
     {link_valoracion: newLink} ,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    dispatch({ type: EDIT_VALUATION_LINK_SUCCESS, payload: newLink });
    return newLink;
  } catch (error: any) {
    console.error('Error en editValuationLinkReducer:', error);
    dispatch({ type: EDIT_VALUATION_LINK_FAILURE, payload: error.message });
    throw error;
  }
};