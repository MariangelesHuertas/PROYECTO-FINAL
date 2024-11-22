export const FETCH_CANDIDATE_SUMMARY_REQUEST = 'FETCH_CANDIDATE_SUMMARY_REQUEST';
export const FETCH_CANDIDATE_SUMMARY_SUCCESS = 'FETCH_CANDIDATE_SUMMARY_SUCCESS';
export const FETCH_CANDIDATE_SUMMARY_FAILURE = 'FETCH_CANDIDATE_SUMMARY_FAILURE';

interface CandidateSummaryRequestAction {
  type: typeof FETCH_CANDIDATE_SUMMARY_REQUEST;
}
interface CandidateSummarySuccessAction {
  type: typeof FETCH_CANDIDATE_SUMMARY_SUCCESS;
  payload: {
    data: any[];
  };
}
interface CandidateSummaryFailureAction {
  type: typeof FETCH_CANDIDATE_SUMMARY_FAILURE;
  payload: string;
}
export type CandidateSummaryActionTypes =
  | CandidateSummaryRequestAction
  | CandidateSummarySuccessAction
  | CandidateSummaryFailureAction;