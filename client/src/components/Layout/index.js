import styled from 'styled-components';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Main = styled.main`
  flex-grow: 1;
  padding-top: 70px; /* Pour compenser la hauteur de la barre de navigation fixe */
`;

export default Layout;