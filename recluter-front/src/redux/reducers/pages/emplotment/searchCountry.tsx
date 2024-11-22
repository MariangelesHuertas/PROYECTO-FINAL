import {
  FETCH_PAISES_FAILURE,
  FETCH_PAISES_REQUEST,
  FETCH_PAISES_SUCCESS,
  PaisesActionTypes
} from "../../../../constants/pages/emplotment/searchCountry";

interface PaisesState {
  rex_loading: boolean;
  rex_paises: any[]; // Aquí se almacenarán todos los sectores
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: PaisesState = {
  rex_loading: false,
  rex_paises: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const searchCountry = (state = initialState, action: PaisesActionTypes): PaisesState => {
  switch (action.type) {
    case FETCH_PAISES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_PAISES_SUCCESS:
      console.log('API Response:', action.payload);
      return {
        ...state,
        rex_loading: false,
        rex_paises: action.payload.data,
        rex_error: null,
      };
    case FETCH_PAISES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default searchCountry;
