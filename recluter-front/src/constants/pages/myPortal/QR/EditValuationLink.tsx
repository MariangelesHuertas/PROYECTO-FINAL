// src/constants/pages/myPortal/valuation/EditValuationLink.ts

export const EDIT_VALUATION_LINK_REQUEST = 'EDIT_VALUATION_LINK_REQUEST';
export const EDIT_VALUATION_LINK_SUCCESS = 'EDIT_VALUATION_LINK_SUCCESS';
export const EDIT_VALUATION_LINK_FAILURE = 'EDIT_VALUATION_LINK_FAILURE';

interface EditValuationLinkRequestAction {
  type: typeof EDIT_VALUATION_LINK_REQUEST;
}

interface EditValuationLinkSuccessAction {
  type: typeof EDIT_VALUATION_LINK_SUCCESS;
  payload: string;
}

interface EditValuationLinkFailureAction {
  type: typeof EDIT_VALUATION_LINK_FAILURE;
  payload: string;
}

export type EditValuationLinkActionTypes =
  | EditValuationLinkRequestAction
  | EditValuationLinkSuccessAction
  | EditValuationLinkFailureAction;