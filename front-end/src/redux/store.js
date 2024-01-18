import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import {Provider} from 'react-redux';
import {useEffect} from 'react';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (error) {
    console.error('Error fetching items', error);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

const ReduxProvider = ({children}) => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveState(store.getState());
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
