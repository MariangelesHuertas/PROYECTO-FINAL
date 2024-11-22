import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  FETCH_CREATE_OFFER,
  FETCH_FAILED_CREATE_OFFER,
  FETCH_RESET_CREATE_OFFER,
  FETCH_SUCCESS_CREATE_OFFER
} from '../../../constants/offers/CreateOffers';
import FetchWithIP from '../utils/FetchHeaders';
import { ResponseFetchInterface } from '../../../interface/Meta';
const API_URL = process.env.REACT_APP_API_BASE_URL;

interface offerCreate {
  "sector_id": number | null,
  "cargo": string,
  "descripcion": string,
  "tipo": string,
  "ubi_provincia": string,
  "ubi_poblacion": string,
  "sal_min": number,
  "sal_max": number,
  "abanico_salarial": string,
  "anios_experiencia": number,
  "estudios_minimos": string | null,
  "tipo_contrato": string,
  "jornada_laboral": string;
  "palabras_clave_ofertas": [];
  "borrador": boolean;
}

export const CreateOfferReducer = (
  values: offerCreate): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch, getState) => {

    const {
      rex_user
    } = getState().auth

    let empresa_id = 0;
    if (rex_user && rex_user.empresa) empresa_id = rex_user.empresa.id

    dispatch({
      type: FETCH_CREATE_OFFER
    })

    try {

      const data = await FetchWithIP('ofertas', {
        method: 'POST'
      }, values).then(res => res.json())
      // {
      //   "sector_id": values.sector_id,
      //   "cargo": values.cargo,
      //   "descripcion": values.descripcion,
      //   "tipo": "inserte tipo",
      //   "ubi_provincia": values.ubi_provincia,
      //   "ubi_poblacion": values.ubi_poblacion,
      //   "sal_min": values.sal_min,
      //   "sal_max": values.sal_max,
      //   "abanico_salarial": values.abanico_salarial,
      //   "anios_experiencia": values.anios_experiencia,
      //   "estudios_minimos": values.estudios_minimos,
      //   "tipo_contrato": values.tipo_contrato,
      //   "jornada_laboral": values.jornada_laboral,
      //   "palabras_clave_ofertas": values.keywords
      // }).then(res => res.json());

      dispatch({
        type: FETCH_SUCCESS_CREATE_OFFER,
        payload: data
      })

      return data

    } catch (error) {
      console.log("error: ");
      console.log(error);

      dispatch({
        type: FETCH_FAILED_CREATE_OFFER,
        payload: error
      })
      throw error;
    }
  };


export const ResetCreateOfferReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {
  dispatch({
    type: FETCH_RESET_CREATE_OFFER
  })
}

export const CreateKillerQuestionReducer = (values: any): ThunkAction<
  Promise<ResponseFetchInterface>,
  RootState,
  unknown,
  Action<string>
> => async () => {

  try {
    const data = await FetchWithIP('killers-questions/create-details', {
      method: 'POST'
    }, values).then(res => res.json())

    return data;
  } catch (error) {

    // dispatch({
    //   type: FETCH_FAILED_CREATE_OFFER,
    //   payload: error
    // })
    // throw error;
    return false;
  }

}