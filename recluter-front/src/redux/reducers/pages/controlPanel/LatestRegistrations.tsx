import {
    FETCH_LATEST_INSCRITOS_FAILURE, FETCH_LATEST_INSCRITOS_REQUEST, FETCH_LATEST_INSCRITOS_SUCCESS, LatestInscritosActionTypes
} from "../../../../constants/pages/controlPanel/LatestRegistrations";
interface LatestInscritos {
    rex_loading_latest_inscritos: boolean;
    rex_latest_inscritos: any;
    rex_error_latest_inscritos: string | null;
}
const initialState: LatestInscritos = {
    rex_loading_latest_inscritos: false,
    rex_latest_inscritos: [],
    rex_error_latest_inscritos: null,
};

const latestInscritos = (state = initialState, action: LatestInscritosActionTypes): LatestInscritos => {
    switch (action.type) {
        case FETCH_LATEST_INSCRITOS_REQUEST:
            return {
                ...state,
                rex_loading_latest_inscritos: true,
            };
        case FETCH_LATEST_INSCRITOS_SUCCESS:
            return {
                ...state,
                rex_loading_latest_inscritos: false,
                rex_latest_inscritos: action.payload,
                rex_error_latest_inscritos: null,
            };
        case FETCH_LATEST_INSCRITOS_FAILURE:
            return {
                ...state,
                rex_loading_latest_inscritos: false,
                rex_error_latest_inscritos: action.payload,
            };
        default:
            return state;
    }
};
export default latestInscritos;
