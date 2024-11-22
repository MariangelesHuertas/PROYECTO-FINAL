// src/constants/pages/myPortal/profile/UpdateSobreMi.ts

export const UPDATE_SOBRE_MI_REQUEST = 'UPDATE_SOBRE_MI_REQUEST';
export const UPDATE_SOBRE_MI_SUCCESS = 'UPDATE_SOBRE_MI_SUCCESS';
export const UPDATE_SOBRE_MI_FAILURE = 'UPDATE_SOBRE_MI_FAILURE';

// Tipos de las acciones
interface UpdateSobreMiRequestAction {
  type: typeof UPDATE_SOBRE_MI_REQUEST;
}

interface UpdateSobreMiSuccessAction {
  type: typeof UPDATE_SOBRE_MI_SUCCESS;
  payload: {
    data: any; // Datos actualizados del sobreMi
  };
}

interface UpdateSobreMiFailureAction {
  type: typeof UPDATE_SOBRE_MI_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type UpdateSobreMiActionTypes =
  | UpdateSobreMiRequestAction
  | UpdateSobreMiSuccessAction
  | UpdateSobreMiFailureAction;