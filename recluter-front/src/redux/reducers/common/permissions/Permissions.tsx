import {
  FETCH_PERMISSIONS_TYPE_USER_REQUEST,
  FETCH_PERMISSIONS_TYPE_USER_SUCCESS,
  FETCH_PERMISSIONS_TYPE_USER_FAILURE,
  FETCH_TYPE_PERMISSION_REQUEST,
  FETCH_TYPE_PERMISSION_SUCCESS,
  FETCH_TYPE_PERMISSION_FAILURE,
  CREATE_TYPE_PERMISSIONS_USER_REQUEST,
  CREATE_TYPE_PERMISSIONS_USER_SUCCESS,
  CREATE_UPDATE_PERMISSIONS_USER_REQUEST,
  CREATE_UPDATE_PERMISSIONS_USER_SUCCESS,
  CREATE_UPDATE_PERMISSIONS_USER_FAILURE,
  PermissionsTypeUserActionTypes,
  CREATE_TYPE_PERMISSIONS_USER_FAILURE
} from "../../../../constants/common/permissions/PermissionsTypeUser";

// Estado inicial para las soft skills
interface PermissionsState {
  rex_loading: boolean;
  rex_permissions_type_user: any[];
  rex_type_permission: any[];
  rex_error: string | null;
}

const initialState: PermissionsState = {
  rex_loading: false,
  rex_permissions_type_user: [],
  rex_type_permission: [],
  rex_error: null,
};

const permissionsReducer = (state = initialState, action: PermissionsTypeUserActionTypes): PermissionsState => {
  switch (action.type) {
    case FETCH_PERMISSIONS_TYPE_USER_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_PERMISSIONS_TYPE_USER_SUCCESS:
      console.log('Soft Skills recibidas en el reducer:', action.payload.data);  // Verificar si los datos llegan al reducer
      return {
        ...state,
        rex_loading: false,
        rex_permissions_type_user: action.payload.data,
        rex_error: null,
      };
    case FETCH_PERMISSIONS_TYPE_USER_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_TYPE_PERMISSION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_TYPE_PERMISSION_SUCCESS:
      console.log('Type permission recibidas en el reducer:', action.payload.data);  // Verificar si los datos llegan al reducer
      return {
        ...state,
        rex_loading: false,
        rex_type_permission: action.payload.data,
        rex_error: null,
      };
    case FETCH_TYPE_PERMISSION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    // case CREATE_TYPE_PERMISSIONS_USER_REQUEST:
    //   return {
    //     ...state,
    //     rex_loading: true,
    //   };
    // case CREATE_TYPE_PERMISSIONS_USER_SUCCESS: // Manejo de la acción
    // return {
    //   ...state,
    //   rex_loading: false,
    //   rex_type_permission: [action.payload.data],
    //   rex_error: null,
    // };
    // case CREATE_TYPE_PERMISSIONS_USER_FAILURE:
    //   return {
    //     ...state,
    //     rex_loading: false,
    //     rex_error: action.payload,
    //   };
    
      case CREATE_UPDATE_PERMISSIONS_USER_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case CREATE_UPDATE_PERMISSIONS_USER_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_permissions_type_user: [action.payload, ...state.rex_permissions_type_user],
          rex_error: null,
        };
      case CREATE_UPDATE_PERMISSIONS_USER_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
    default:
      return state;
  }
};

export default permissionsReducer;