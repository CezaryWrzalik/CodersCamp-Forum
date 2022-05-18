import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

import LoginForm, { LoginDetails } from './LoginForm';
import RegisterForm, { RegisterDetails } from './RegisterForm';

// Styles
const Wrapper = styled.div<{ active: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
`;
const CloseBtn = styled.div`
  position: absolute;
  right: 80px;
  top: 40px;
  font-size: 50px;
  color: #ffff;
  cursor: pointer;
`;
const ModalWindow = styled.div`
  background: rgba(255, 255, 255);
  border-radius: 15px;
  padding: 15px;
`;

// Modal hook
export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default function LoginModal({
  isShowing,
  hide,
}: {
  isShowing: boolean;
  hide: () => void;
}): ReactElement {
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const { isShowing: wantRegister, toggle } = useModal();

  const loginHandler = (details: LoginDetails) => {
    axios
      .post('http://localhost:4000/auth/login/', details)
      .then((result) => {
        // details correct
        console.log('Welcome!');
        localStorage.setItem('auth-token', result.headers['x-auth-token']);
        hide();
        window.location.href = window.location.href;
      })
      .catch((er) => {
        // details incorrect
        setLoginError(er.response.data);
      });
  };

  const registerHandler = (details: RegisterDetails) => {
    console.log(details);
    axios
      .post('http://localhost:4000/auth/register/', details)
      .then((result) => {
        // details correct
        console.log('Welcome!');
        toggle();
        window.location.href = window.location.href;
      })
      .catch((er) => {
        // details incorrect
        setRegisterError(er.response.data);
      });
  };

  return isShowing ? (
    <Wrapper active={isShowing}>
      <CloseBtn onClick={() => hide()}>&times;</CloseBtn>
      <ModalWindow>
        {!wantRegister ? (
          <RegisterForm
            error={registerError}
            login={toggle}
            register={registerHandler}
          />
        ) : (
          <LoginForm
            error={loginError}
            login={loginHandler}
            register={toggle}
          />
        )}
      </ModalWindow>
    </Wrapper>
  ) : (
    <></>
  );
}
