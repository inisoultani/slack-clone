import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const Loading = () => {
  return (
    <LoadingStyled>
      <LoadingContentStyled>
        <img
          alt="slack-logo"
          src="https://image.flaticon.com/icons/png/512/2111/2111615.png"
        />
        <Spinner color="purple" name="ball-spin-fade-loader" fadeIn="none" />
      </LoadingContentStyled>
    </LoadingStyled>
  );
};

export default Loading;

const LoadingStyled = styled.div``;

const LoadingContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 50px; */
  height: 100vh;

  & > img {
    width: 100px;
    margin: 100px;
  }
`;
