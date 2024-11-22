import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';

import {
  FETCH_CANDIDATE_SUMMARY_FAILURE,
  FETCH_CANDIDATE_SUMMARY_REQUEST,
  FETCH_CANDIDATE_SUMMARY_SUCCESS,
  CandidateSummaryActionTypes
} from '../../../../constants/pages/controlPanel/CandidateSummary'
import FetchWithIP from '../../utils/FetchHeaders';


export const fetchCandidateSummaryRequestReducer = (): CandidateSummaryActionTypes => ({
  type: FETCH_CANDIDATE_SUMMARY_REQUEST,
});

export const fetchCandidateSummarySuccessReducer = (data: any[]): CandidateSummaryActionTypes => ({

  type: FETCH_CANDIDATE_SUMMARY_SUCCESS,
  payload: { data },
});

export const fetchCandidateSummaryFailureReducer = (error: string): CandidateSummaryActionTypes => ({
  type: FETCH_CANDIDATE_SUMMARY_FAILURE,
  payload: error,
});

export const GetCandidateSummaryReducer = (
): ThunkAction<Promise<any>, RootState, unknown, CandidateSummaryActionTypes> => async (dispatch) => {
  dispatch(fetchCandidateSummaryRequestReducer());

  try {
    const respuesta = await FetchWithIP(`dashboard/findAllInscritosOfertaGroupByFases/`, {
      method: 'GET'
    },
    );

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    if (Array.isArray(data.data)) {
      let rpta:any = []
      data.data.map((dat: any) => {
        rpta.push({
          "name": dat.fase,
          "value": dat.porcentaje
        })
      })
      dispatch(fetchCandidateSummarySuccessReducer(rpta));
      // return { payload: { data: rpta } };

    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchCandidateSummaryFailureReducer('Error '));
    return { payload: [] };
  }
};