import {
  FETCH_FOLLOWED_COMPANIES_REQUEST,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_FAILURE,
  FollowedCompaniesActionTypes
} from '../../../../constants/pages/followedCompanies/FollowedCompanies';

interface FollowedCompaniesState {
  rex_loading: boolean;
  rex_companyNames: { id: number, name: string }[]; // Almacena objetos con id y nombre
  rex_error: string | null;
}

const initialState: FollowedCompaniesState = {
  rex_loading: false,
  rex_companyNames: [], // Inicializa como un array vacío de objetos
  rex_error: null,
};

const followedCompaniesReducer = (state = initialState, action: FollowedCompaniesActionTypes): FollowedCompaniesState => {
  switch (action.type) {
    case FETCH_FOLLOWED_COMPANIES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_FOLLOWED_COMPANIES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_companyNames: action.payload, // Almacena el array de objetos
        rex_error: null,
      };
    case FETCH_FOLLOWED_COMPANIES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default followedCompaniesReducer;
