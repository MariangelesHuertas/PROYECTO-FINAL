import { 
    FETCH_TYPE_USERS_REQUEST,
    FETCH_TYPE_USERS_SUCCESS,
    FETCH_TYPE_USERS_FAILURE,
    CREATE_TYPE_USERS_FAILURE,
    CREATE_TYPE_USERS_REQUEST,
    CREATE_TYPE_USERS_SUCCESS,
    FETCH_TYPE_USERS_TABLE,
    TypeUsersActionTypes
 } from "../../../../constants/common/type-users/Type-Users";
  
  // Estado inicial para las aptitudes
  interface TypeUsersState {
    rex_loading: boolean;
    rex_types_users: any[]; // Aquí se almacenarán todas las aptitudes
    rex_error: string | null;
    rex_meta: { total: number; limit: number; page: number } | undefined;
  }
  
  const initialState: TypeUsersState = {
    rex_loading: false,
    rex_types_users: [],
    rex_meta: { total: 0, limit: 10, page: 1 },
    rex_error: null,
  };
  
  const typeUsersReducer = (state = initialState, action: TypeUsersActionTypes): TypeUsersState => {
    switch (action.type) {
      case FETCH_TYPE_USERS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_TYPE_USERS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_types_users: [
            ...action.payload.data
          ],
          rex_error: null,
        };
      case FETCH_TYPE_USERS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      case FETCH_TYPE_USERS_TABLE:
        return {
          ...state,
          rex_loading: false,
          rex_types_users: action.payload.data,
          rex_meta: action.payload.meta,
        };
    //   case CREATE_SKILLS_REQUEST:
    //     return {
    //       ...state,
    //       rex_loading: true,
    //     };
    //   case CREATE_SKILLS_SUCCESS:
    //     return {
    //       ...state,
    //       rex_loading: false,
    //       rex_skills: [action.payload, ...state.rex_skills],
    //       rex_error: null,
    //     };
    //   case CREATE_SKILLS_FAILURE:
    //     return {
    //       ...state,
    //       rex_loading: false,
    //       rex_error: action.payload,
    //     };
      default:
        return state;
    }
  };
  
  
  export default typeUsersReducer;
  