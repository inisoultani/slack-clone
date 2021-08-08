import React from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Chat = () => {
  return (
    <ChatContainerStyled>
      <HeaderStyled>
        <HeaderLeftStyled>
          <h4>#Room-name</h4>
          <StarBorderOutlinedIcon />
        </HeaderLeftStyled>
        <HeaderRightStyled>
          <p>
            <InfoOutlinedIcon /> <span>Details</span>
          </p>
        </HeaderRightStyled>
      </HeaderStyled>
    </ChatContainerStyled>
  );
};

export default Chat;

const ChatContainerStyled = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  /* margin-top: 10px; */
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 20px;
`;
const HeaderLeftStyled = styled.div`
  display: flex;
  align-items: center;
  & > h4 {
    /* border: 1px solid purple; */
    display: flex;
    text-transform: lowercase;
  }

  & > h4 > .MuiSvgIcon-root {
  }
`;

const HeaderRightStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 0.1;
  & > p {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
