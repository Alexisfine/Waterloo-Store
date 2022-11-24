import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import './resources/style/bootstrap.min.css';
import './index.css';
import App from './App';
import store from './store';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = ({children}) => {
    return (
        <Provider store={store}>{children}</Provider>
    )
}
root.render(
  <AppWrapper>
    <App/>
  </AppWrapper>
);

reportWebVitals();


