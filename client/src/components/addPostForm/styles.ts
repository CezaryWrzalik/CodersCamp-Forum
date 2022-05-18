import styled from 'styled-components';

// Styles
export const Form = styled.form`
  display: flex;
  flex-direction:column;
`;

export const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormHeader = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 10px 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const Label = styled.label`
  text-align:center;
`;

export const Input = styled.input`
border: none;
  outline: none;
  background: #f1f1f0;
  border-radius: 20px;
  height: 50px;
  padding-left: 40px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
`;

export const SubmitButton = styled.button`
background: rgba(255, 234, 137, 0.9);
  height: 50px;
  width: 124px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

export const ErrorMessage = styled.div``;
