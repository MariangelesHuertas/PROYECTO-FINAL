// actions/GetApplications.ts
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  FETCH_GET_APPLICATIONS_REQUEST,
  FETCH_GET_APPLICATIONS_SUCCESS,
  FETCH_GET_APPLICATIONS_FAILURE,
} from '../../../constants/applications/GetApplications';
import FetchWithIP from '../utils/FetchHeaders';

export const GetApplicationsReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch, getState) => {
  dispatch({ type: FETCH_GET_APPLICATIONS_REQUEST });

  try {
    const response = await FetchWithIP('postulaciones/getAllByUserToken', { method: 'GET' }).then(res => res.json());

    const applicationData = response.data.map((application: any) => ({
      id: application.id,
      usuario_id: application.usuario_id,
      oferta_id: application.oferta_id,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      empresa_id: application.ofertas?.empresa_id || application.empresa_id, // Asegúrate de que esto esté presente
      ofertas: {
        id: application.ofertas.id,
        cargo: application.ofertas.cargo, // Asegúrate de que esto esté presente
        descripcion: application.ofertas.descripcion,
        tipo: application.ofertas.tipo,
        ubi_provincia: application.ofertas.ubi_provincia,
        ubi_poblacion: application.ofertas.ubi_poblacion,
        sal_min: application.ofertas.sal_min,
        sal_max: application.ofertas.sal_max,
        anios_experiencia: application.ofertas.anios_experiencia,
        estudios_minimos: application.ofertas.estudios_minimos,
        tipo_contrato: application.ofertas.tipo_contrato,
        jornada_laboral: application.ofertas.jornada_laboral,
        createdAt: application.ofertas.createdAt,
      },
    }));

    dispatch({
      type: FETCH_GET_APPLICATIONS_SUCCESS,
      payload: {
        data: applicationData,
        meta: response.meta,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_GET_APPLICATIONS_FAILURE,
      error: (error as Error).message,
    });
    console.error('Error al obtener las postulaciones', error);
  }
};
