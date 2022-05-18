import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';

const Form = styled.form<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  max-width: 500px;
`;
const TextArea = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  max-width: 500px;
  height: 80px;
  border-radius: 15px;
  padding: 10px;
  margin: 20px 0 0;
  &:focus {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;
const BtnList = styled.div`
  display: flex;
  margin: 10px 0 0;
`;
const SubmitBtn = styled.button`
  display: block;
  padding: 15px 25px;
  background: #54a0ff;
  border-radius: 15px;
  font-size: 16px;
  color: #e7e8e6;
  margin: 0 10px 0 auto;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  display: block;
  padding: 15px 25px;
  background: #ff6b6b;
  border-radius: 15px;
  font-size: 16px;
  color: #e7e8e6;
  cursor: pointer;
`;
interface CommentFormProps {
  content: string;
  isBtnActive: boolean;
  postId: string;
  setContent: (content: string) => void;
  toggleCommentForm: (e: MouseEvent) => void;
}
const CommentForm = ({
  content,
  isBtnActive,
  postId,
  setContent,
  toggleCommentForm,
}: CommentFormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const URL = process.env.URL || 'http://localhost:4000';
    const sendData = {
      content,
      post: postId,
    };

    await axios.post(`${URL}/comments`, sendData, {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    });
  };

  const updateField = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isBtnActive) setContent(e.target.value);
    else setContent('');
  };

  return (
    <Form action="" active={isBtnActive} onSubmit={handleSubmit}>
      <TextArea onChange={updateField} value={content} />
      <BtnList>
        <SubmitBtn type="submit">Submit</SubmitBtn>
        <DeleteBtn onClick={toggleCommentForm} type="button">
          Delete
        </DeleteBtn>
      </BtnList>
    </Form>
  );
};

export default CommentForm;
