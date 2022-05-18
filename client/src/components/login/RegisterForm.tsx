import React, { ReactElement, useState } from 'react';

import { Anchor, ErrorMessage, Form, FormFooter, FormGroup, FormHeader, FormInner, Input, Label,  SubmitButton } from './styles';

// Types
type RegisterFormProps = {
  register: (details: RegisterDetails) => void;
  error: string;
  login: ()=>void;
};

export type RegisterDetails = {
  userName: string;
  password: string;
  email: string;
};

export default function RegisterForm({
  register,
  error,
  login
}: RegisterFormProps): ReactElement {
  const [details, setDetails] = useState({ userName: '', password: '', email: '' });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    register(details);
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormInner>
        <FormHeader>Register</FormHeader>
        {(error !== "")?(<ErrorMessage>{error}</ErrorMessage>) : ""}
        <FormGroup>
          <Label htmlFor="login">
            Nazwa użytkownika
          </Label>
          <Input
              id="login"
              name="login"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setDetails({ ...details, userName: e.target.value })
              }
              type="text"
              value={details.userName}
            />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">
            Email
          </Label>
          <Input
              id="email"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setDetails({ ...details, email: e.target.value })
              }
              type="text"
              value={details.email}
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
        <SubmitButton type="submit">Zarejestruj się</SubmitButton>
      </FormInner>
      <FormFooter>
        Masz już konto? <Anchor onClick={login}>Zaloguj się</Anchor>
      </FormFooter>
    </Form>
  );
};
