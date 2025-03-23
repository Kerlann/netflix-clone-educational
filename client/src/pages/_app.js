import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import theme from '../styles/theme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;