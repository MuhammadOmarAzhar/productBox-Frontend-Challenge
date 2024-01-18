import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import {Provider} from 'react-redux';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const ReduxProvider = ({children}) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
