import React from 'react';
import AppRoutes from './routes/Routes';
import { Provider } from 'react-redux'
import generateStore, { history } from './redux/store/index';
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter } from "react-router-dom";
import {
  App as AppAntd
} from "antd";
import './index.css'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// CONFIGURAR EL IDIOMA PARA ANTD
import { ConfigProvider } from "antd";
import moment from "moment";
import 'moment/locale/es';
import es_ES from "antd/lib/locale/es_ES";

moment.locale("es");

const App: React.FC = () => {

  const store = generateStore()

  return (
    <ConfigProvider locale={es_ES}>
      <Provider store={store}>

        {/* <ConnectedRouter history={history}> */}
        <BrowserRouter>
          <AppAntd>
            <AppRoutes />
          </AppAntd>
        </BrowserRouter>
        {/* </ConnectedRouter> */}
      </Provider>
    </ConfigProvider>
  )
};

export default App;
