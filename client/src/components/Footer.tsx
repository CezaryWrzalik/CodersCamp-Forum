import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useFetchTopHashtags from '../utils/useFetchTopHashtags';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 1400px;
  border-top: 3px solid #c4c4c4;
  display: flex;

  align-items: center;
  flex-direction: column;
  padding-top: 30px;

  @media (min-width: 500px) {
    width: 70%;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const LinksContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  min-width: 190px;

  @media (min-width: 500px) {
    width: 47%;
  }
`;

const HashtagsContainer = styled(LinksContainer)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 300px;
`;

const StyledLink = styled(Link)`
  color: rgba(61, 68, 67, 0.8);
  text-decoration: none;
  display: inline-block;
  margin-right: 6px;
  font-weight: 600;

  &:hover {
    color: #3d4443;
  }
`;

const StyledTheBestHashtag = styled(StyledLink)`
  font-weight: 800;
  font-size: 20px;
`;

const StyledMediumHashtag = styled(StyledLink)`
  font-weight: 600;
  font-size: 16px;
`;

const StyledNormalHashtag = styled(StyledLink)`
  font-weight: 400;
  font-size: 14px;
`;

const Sign = styled.h6`
  color: rgba(61, 68, 67, 0.6);
  font-weight: 400;
  margin: 15px 0;
`;

const Footer: FC = () => {
  const hashtags = useFetchTopHashtags();

  const theBestHashtags = hashtags
    .slice(0, 4)
    .map((hashtag) => (
      <StyledTheBestHashtag to={`/posts/ranking/${hashtag}/1`}>
        {hashtag}
      </StyledTheBestHashtag>
    ));

  const mediumHashtags = hashtags
    .slice(4, 7)
    .map((hashtag) => (
      <StyledMediumHashtag to={`/posts/ranking/${hashtag}/1`}>
        {hashtag}
      </StyledMediumHashtag>
    ));

  const normalHashtags = hashtags
    .slice(7, 10)
    .map((hashtag) => (
      <StyledNormalHashtag to={`/posts/ranking/${hashtag}/1`}>
        {hashtag}
      </StyledNormalHashtag>
    ));

  const allHashtags = [
    theBestHashtags[0],
    normalHashtags[0],
    mediumHashtags[0],
    theBestHashtags[1],
    normalHashtags[1],
    mediumHashtags[1],
    mediumHashtags[2],
    theBestHashtags[2],
    theBestHashtags[3],
    normalHashtags[2],
  ];

  return (
    <FooterWrapper>
      <Wrapper>
        <LinksContainer>
          <StyledLink to="/">Idea CodeForum</StyledLink>
          <StyledLink to="/">Regulamin</StyledLink>
        </LinksContainer>
        <HashtagsContainer>
          {allHashtags.map((hashtag) => hashtag)}
        </HashtagsContainer>
      </Wrapper>
      <Sign>Created by !Programiści</Sign>
    </FooterWrapper>
  );
};

export default Footer;
