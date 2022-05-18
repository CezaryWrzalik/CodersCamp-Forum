import React, { ReactElement, useState } from 'react';

import { Anchor, ErrorMessage, Form, FormFooter, FormGroup, FormHeader, FormInner, Input, Label,  SubmitButton } from './styles';

// Types
type LoginFormProps = {
  login: (details: LoginDetails) => void;
  error: string;
  register: ()=>void;
};

export type LoginDetails = {
  login: string;
  password: string;
};

export default function LoginForm({
  login,
  error,
  register
}: LoginFormProps): ReactElement {
  const [details, setDetails] = useState({ login: '', password: '' });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    login(details);
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormInner>
        <FormHeader>Login</FormHeader>
        {(error !== "")?(<ErrorMessage>{error}</ErrorMessage>) : ""}
        <FormGroup>
          <Label htmlFor="login">
            Nazwa użytkownika lub email
          </Label>
          <Input
              id="login"
              name="login"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setDetails({ ...details, login: e.target.value })
              }
              type="text"
              value={details.login}
            />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">
            Hasło
          </Label>
          <Input
              id="password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setDetails({ ...details, password: e.target.value })
              }
              type="password"
              value={details.password}
            />
        </FormGroup>
        <SubmitButton type="submit">Zaloguj się</SubmitButton>
      </FormInner>
      <FormFooter>
        Nie masz konta? <Anchor onClick={register}>Zarejestruj się</Anchor>
      </FormFooter>
    </Form>
  );
};
