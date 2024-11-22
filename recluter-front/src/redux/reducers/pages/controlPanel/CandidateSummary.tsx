import {
  FETCH_CANDIDATE_SUMMARY_FAILURE,
  FETCH_CANDIDATE_SUMMARY_REQUEST,
  FETCH_CANDIDATE_SUMMARY_SUCCESS,
  CandidateSummaryActionTypes
} from "../../../../constants/pages/controlPanel/CandidateSummary";
interface CandidateSummaryInterface {
  rex_loading: boolean;
  rex_candidateSummary: any;
  rex_error: string | null;
}
const initialState: CandidateSummaryInterface = {
  rex_loading: false,
  rex_candidateSummary: [],
  rex_error: null,
};

const CandidateSummary = (
  state = initialState, action: CandidateSummaryActionTypes
): CandidateSummaryInterface => {
  switch (action.type) {
    case FETCH_CANDIDATE_SUMMARY_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_CANDIDATE_SUMMARY_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_candidateSummary: action.payload,
        rex_error: null,
      };
    case FETCH_CANDIDATE_SUMMARY_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};
export default CandidateSummary;
