import React from 'react';
import Header from '@/components/Header';
import '@/styles/globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/store';

function MyApp({Component, pageProps}) {
  return (
    <ReduxProvider>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
