import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Post from '../types/Post';

interface PostSampleProps {
  post: Post;
  currentPage: number;
}
// Styles
const StyledLink = styled(Link)`
  display: block;
  max-width: 1003px;
  text-decoration: none;
  border-radius: 15px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
  &:nth-of-type(n + 2) {
    margin: 44px 0 0;
  }
  &:hover {
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  }
`;
const Wrapper = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
  color: #3d4443;

  @media (max-width: 576px) {
    display: block;
  }
`;
const Img = styled.img`
  display: block;
  width: 100%;
  max-width: 222px;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 15px;

  @media (max-width: 576px) {
    margin: 0 auto;
    max-width: unset;
  }
`;
const Text = styled.div`
  margin: 0 0 0 27px;

  @media (max-width: 576px) {
    margin: 15px 0 0;
  }
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 600px;
  line-height: 29px;
`;
const Capture = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 0 0;
  font-size: 18px;
  font-weight: 500px;
  line-height: 24px;
  max-width: 400px;

  @media (max-width: 576px) {
    display: block;
  }
`;
const Content = styled.p`
  font-weight: 600px;
  font-size: 18px;
  margin: 8px 0 0;
`;
const CHARACTERS_PER_POST_SAMPLE = 80;
const PostSample = ({ post, currentPage }: PostSampleProps) => {
  return (
    <StyledLink to={`/posts/${currentPage}/${post._id}`}>
      <Wrapper>
        <Img alt="Post" src={post.imageUrl} />
        <Text>
          <Title>{post.title}</Title>
          <Capture>
            <div>@{post.author}</div>
            <div>
              {post.hashtags.reduce(
                (total: string, current: string) =>
                  total.concat(`  #${current}`),
                '',
              )}
            </div>
          </Capture>
          <Content>
            {post.content.length > CHARACTERS_PER_POST_SAMPLE
              ? post.content.slice(0, CHARACTERS_PER_POST_SAMPLE).concat('...')
              : post.content}
          </Content>
        </Text>
      </Wrapper>
    </StyledLink>
  );
};
export default PostSample;
