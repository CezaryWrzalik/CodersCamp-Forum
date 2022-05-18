import React, { useRef, useEffect, useState } from 'react';

import styled from 'styled-components';

import LoadingSvg from '../assets/Loader.svg';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import ExpandedPost from '../components/ExpandedPost';
import useFetchPostById from '../utils/useFetchPostById';

const Loader = styled.img`
  display: block;
  margin: 0 auto;
  border-radius: 20px;
`;
const CommentList = styled.div`
  padding: 40px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin: 55px 0 0;
`;
const Title = styled.h3`
  font-size: 26px;
  font-weight: 500;
  margin: 0 0 20px;
`;
const AddCommentBtn = styled.button`
  display: block;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  background: rgba(255, 234, 137, 0.9);
  border-radius: 15px;
  padding: 18px 26px;
  margin: 30px 0 0 auto;
  color: #3d4443;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 576px) {
    padding: 15px 20px;
    font-size: 16px;
  }
`;

const PostDetails = ({ match }: any) => {
  const { isLoading, post, comments } = useFetchPostById(match.params.id);
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const toggleCommentForm = () => {
    setIsBtnActive(!isBtnActive);
    setContent('');
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const pulledToken = localStorage.getItem('auth-token');

    if (pulledToken) {
      setToken(pulledToken);
    } else {
      setToken(null);
    }
  });
  if (isLoading) return <Loader alt="Loading" src={LoadingSvg} />;

  return (
    <>
      <ExpandedPost post={post} />
      <CommentList>
        <Title>Komentarze ({post.commentsCount}):</Title>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
        {token ? (
          <AddCommentBtn onClick={toggleCommentForm}>
            Dodaj komentarz
          </AddCommentBtn>
        ) : (
          ''
        )}
      </CommentList>
      <CommentForm
        content={content}
        isBtnActive={isBtnActive}
        postId={match.params.id}
        setContent={setContent}
        toggleCommentForm={toggleCommentForm}
      />
    </>
  );
};

export default PostDetails;
