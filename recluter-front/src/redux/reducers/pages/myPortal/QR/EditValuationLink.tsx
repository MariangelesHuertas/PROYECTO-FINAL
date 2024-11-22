// src/reducers/pages/myPortal/valuation/editValuationLinkReducer.ts

import {
    EDIT_VALUATION_LINK_REQUEST,
    EDIT_VALUATION_LINK_SUCCESS,
    EDIT_VALUATION_LINK_FAILURE,
    EditValuationLinkActionTypes,
  } from '../../../../../constants/pages/myPortal/QR/EditValuationLink';
  
  interface EditValuationLinkState {
    rex_editing: boolean;
    rex_editSuccess: boolean;
    rex_editError: string | null;
    rex_valuationLink: string | null;
  }
  
  const initialState: EditValuationLinkState = {
    rex_editing: false,
    rex_editSuccess: false,
    rex_editError: null,
    rex_valuationLink: null,
  };
  
  export const editValuationLinkReducer = (
    state = initialState,
    action: EditValuationLinkActionTypes
  ): EditValuationLinkState => {
    switch (action.type) {
      case EDIT_VALUATION_LINK_REQUEST:
        return {
          ...state,
          rex_editing: true,
          rex_editSuccess: false,
          rex_editError: null,
        };
      case EDIT_VALUATION_LINK_SUCCESS:
        return {
          ...state,
          rex_editing: false,
          rex_editSuccess: true,
          rex_editError: null,
          rex_valuationLink: action.payload,
        };
      case EDIT_VALUATION_LINK_FAILURE:
        return {
          ...state,
          rex_editing: false,
          rex_editSuccess: false,
          rex_editError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default editValuationLinkReducer;