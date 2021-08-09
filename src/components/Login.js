import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { auth, provider } from '../firebase/config';

const Login = () => {
  const onClick = () => {
    auth
      .signInWithPopup(provider)
      .then((auth) => console.log(auth.user.displayName))
      .catch((error) => console.log(error));
    auth.signOut();
  };

  return (
    <LoginStyled>
      <LoginInnerStyled>
        <img
          alt="slack-icon"
          src="https://image.flaticon.com/icons/png/512/2111/2111615.png"
        />
        <h1>Login to Sultan HQ</h1>
        <p>sultan.slack.com</p>
        <Button onClick={onClick}>Sign in with google</Button>
      </LoginInnerStyled>
    </LoginStyled>
  );
};

export default Login;

const LoginStyled = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const LoginInnerStyled = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.01);

  & > img {
    height: 100px;
    object-fit: contain;
    padding: 20px;
  }

  & > Button {
    margin-top: 50px;
    background-color: green !important;
    text-transform: inherit !important;
    color: white;
  }
`;
