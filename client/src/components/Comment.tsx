import React from 'react';

import styled from 'styled-components';

import UserImgSrc from '../assets/user.svg';
import IComment from '../types/IComment';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #eceaea;
  border-radius: 10px;
  &:nth-of-type(n + 2) {
    margin: 20px 0 0;
  }
`;
const UserImg = styled.img`
  width: 64px;
  height: 64px;
`;
const Author = styled.h4`
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: #e67465;
`;
const Content = styled.p`
  font-size: 16px;
  margin: 8px 0 0;
`;
const Text = styled.div`
  margin: 0 0 0 30px;
`;
const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <Wrapper>
      <UserImg src={UserImgSrc} />
      <Text>
        <Author>{comment.author}</Author>
        <Content>{comment.content}</Content>
      </Text>
    </Wrapper>
  );
};

export default Comment;
