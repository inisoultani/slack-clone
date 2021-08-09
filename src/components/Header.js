import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainerStyled>
      <HeaderLeftStyled>
        <HeaderAvatarStyled
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeftStyled>
      <HeaderCenterStyled>
        <SearchIcon />
        <input type="text" placeholder="search" />
      </HeaderCenterStyled>
      <HeaderRightStyled>
        <HelpOutlineIcon />
      </HeaderRightStyled>
    </HeaderContainerStyled>
  );
};

export default Header;

const HeaderContainerStyled = styled.div`
  /* color: red; */
  display: flex;
  background-color: var(--slack-color);
  justify-content: space-between;
  align-items: center;
  & div {
    /* border: 1px solid blue; */
    color: white;
  }
`;

const HeaderLeftStyled = styled.div`
  /* color: red; */
  display: flex;
  flex: 0.3;
  align-items: center;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }

  > .MuiAvatar-root {
    width: 30px;
    height: 30px;
    margin: 5px 10px;
  }
`;

const HeaderCenterStyled = styled.div`
  /* color: red; */
  display: flex;
  flex: 0.4;
  align-items: center;
  background-color: #421f44;
  text-align: center;
  border-radius: 6px;
  padding: 2px 10px;
  color: gray;
  border: 1px solid gray;

  > input {
    width: 100%;
    background-color: transparent;
    border: none;
    text-align: center;
    outline: 0;
    color: white;
  }
`;

const HeaderRightStyled = styled.div`
  /* color: red; */
  flex: 0.3;
  display: flex;
  justify-content: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatarStyled = styled(Avatar)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
