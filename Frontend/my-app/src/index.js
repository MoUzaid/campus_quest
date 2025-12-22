import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  </BrowserRouter>
);
