import { FC, useEffect, useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import searchIcon from '../assets/search.svg';
import useFetchTopHashtags from '../utils/useFetchTopHashtags';
import LoginModal, { useModal } from './login/LoginModal';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 290px;
  /* border: 1px solid green; */

  @media (min-width: 574px) {
    height: 270px;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  width: 95%;
  max-width: 1600px;
  padding: 8px 0;
  background: rgba(255, 255, 255, 0.45);
  margin-top: 20px;

  @media (min-width: 450px) {
    padding: 15px 0;
    width: 90%;
  }
`;

const Logo = styled(Link)`
  font-size: 27px;
  font-weight: 600;
  color: #3d4443;
  cursor: pointer;
  text-decoration: none;
  color: #3d4443;
  @media (min-width: 390px) {
    font-size: 27px;
  }
`;

const SearchBarWrapper = styled.div`
  height: 50px;
  /* display: none; */

  position: absolute;
  top: 85px;
  width: 80%;
  max-width: 300px;

  @media (min-width: 450px) {
    position: absolute;
    max-width: 500px;
    top: 111px;
  }

  @media (min-width: 1100px) {
    max-width: 1000px;
    width: 33%;
    top: 0;
    position: relative;
    display: block;
  }
`;

const SearchBar = styled.input`
  border: none;
  outline: none;
  background: #e7e8e6;
  border-radius: 20px;
  height: 40px;
  width: 100%;
  padding-left: 40px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;

  @media (min-width: 450px) {
    height: 50px;
  }

  @media (min-width: 1100px) {
    background: #f1f1f0;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  /* top: 50%; */
  left: 10px;
  /* transform: translateY(-50%); */

  @media (min-width: 450px) {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;

  @media (min-width: 550px) {
    width: 225px;
    justify-content: space-between;
  }

  @media (min-width: 750px) {
    width: 235px;
  }

  @media (min-width: 750px) {
    width: 245px;
  } ;
`;

const LoginButton = styled.button`
  background: rgba(255, 234, 137, 0.9);
  height: 30px;
  width: 100px;
  border: none;
  font-size: 13px;
  border-radius: 30px;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  @media (min-width: 450px) {
    font-size: 16px;
    width: 124px;
    height: 50px;
  } ;
`;

const HashtagWrapper = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 15px;
  width: 90%;
  max-width: 1400px;
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.45);
  /* margin-top: 30px; */
  margin-top: 70px;

  list-style: none;

  @media (min-width: 500px) {
    width: 80%;
  }

  @media (min-width: 1100px) {
    width: 70%;
  }
`;

const Hashtag = styled(Link)`
  text-decoration: none;
  color: rgba(61, 68, 67, 0.7);
  font-weight: 500;
  margin: 5px 15px;

  &:hover {
    color: #3d4443;
  }

  @media (min-width: 950px) {
    margin: 5px 5px;
  }
`;

const SwitchWrapper = styled.div`
  position: relative;
  display: none;
  @media (min-width: 550px) {
    display: block;
  }
`;
const SwitchLabel = styled.label`
  position: absolute;
  top: -4px;
  left: 0;
  width: 85px;
  height: 40px;
  border-radius: 30px;
  background: #e7e8e6;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: 4px 25px 0px 5px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const SwitchInput = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${SwitchLabel} {
    background: rgba(255, 234, 137, 0.9);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin: 4px 0px 10px 49px;
      transition: 0.2s;
    }
  }
`;

const AddButton = styled.button`
  border: none;
  width: 100%;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  cursor: pointer;
`;

const Navbar: FC = () => {
  const hashtags = useFetchTopHashtags();

  const { isShowing, toggle } = useModal();

  return (
    <Header>
      <Wrapper>
        <Logo to="/posts/1">CampForum</Logo>
        <SearchBarWrapper>
          <SearchIcon src={searchIcon} />
          <SearchBar type="text" />
        </SearchBarWrapper>
        <ButtonsWrapper>
          <SwitchWrapper>
            <SwitchInput id="checkbox" type="checkbox" />
            <SwitchLabel htmlFor="checkbox" />
          </SwitchWrapper>
          {localStorage.getItem('auth-token') !== '' ? (
            <LoginButton
              onClick={() => {
                localStorage.setItem('auth-token', '');
                window.location.href = window.location.href;
              }}
            >
              Wyloguj się
            </LoginButton>
          ) : (
            <LoginButton onClick={toggle}>Zaloguj się</LoginButton>
          )}
        </ButtonsWrapper>

        <LoginModal hide={toggle} isShowing={isShowing} />
      </Wrapper>
      <HashtagWrapper>
        {hashtags.map((h) => (
          <Hashtag to={`/posts/ranking/${h}/1`}>{h}</Hashtag>
        ))}
      </HashtagWrapper>
      {localStorage.getItem('auth-token') ? (
        <AddButton>
          <Link to="/add/post">Dodaj Post</Link>
        </AddButton>
      ) : null}
    </Header>
  );
};

export default Navbar;
