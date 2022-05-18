import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${(props) =>
      props.theme.colors.lightTheme ? '#F4F4F4' : '#3D4443'};
  }

  a,input,button,textarea{
    text-decoration:none;
    border:none;
    &:focus,&:active{
      outline: none
      
    }
  }
`;

export default GlobalStyle;
