import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';

import App from './App';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <ConfigProvider locale={en_US}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
