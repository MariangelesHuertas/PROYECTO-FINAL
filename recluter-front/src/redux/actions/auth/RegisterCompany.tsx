import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import FetchWithIP from '../utils/FetchHeaders';

interface RegisterCompanyProps {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  usuario: string;
  email: string;
  contrasena: string;
  empresa: string;
  pagina_web: string;
  sede_fiscal: string;
  tamanio: number;
  descripcion: string
}

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const RegisterCompanyAuthReducer = (
  values: RegisterCompanyProps): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch) => {

    try {

      const data = await FetchWithIP('empresas', {
        method: 'POST'
      }, values).then(res => res.json());
      
      return data

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      localStorage.clear()
      throw error;
    }
  };