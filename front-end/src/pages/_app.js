import React from 'react';
import Header from '@/components/Header';
import '@/styles/globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
