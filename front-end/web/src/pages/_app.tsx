import 'tailwindcss/tailwind.css';
import React from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

import Loading from '../components/Loading';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  
  return (
    <>
      {pageLoading ? (
        <Loading />
      ) : (
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyle />
          </ThemeProvider>
        </AuthProvider>
      )}
    </>
  );
};

export default MyApp;
