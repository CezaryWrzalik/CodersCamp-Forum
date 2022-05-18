import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import reportWebVitals from './reportWebVitals';
import postsSliceReducer from './store/PostSlice';

const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    // devTools: process.env.NODE_ENV !== 'development' ? false : true,
  },
});

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
