import { FC } from 'react';

import styled from 'styled-components';

import Footer from './Footer';
import Navbar from './Navbar';

const StyledMain = styled.main`
  width: 90%;
  max-width: 1600px;
  margin: 20px auto;
`;

const Layout: FC = ({ children }) => (
  <>
    <Navbar />
    <StyledMain>{children}</StyledMain>
    <Footer />
  </>
);

export default Layout;
