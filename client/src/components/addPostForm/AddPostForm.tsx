import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

import {
  ErrorMessage,
  Form,
  FormGroup,
  FormInner,
  Input,
  Label,
  SubmitButton,
} from './styles';

export default function AddPostForm() {
  const history = useHistory();
  const [details, setDetails] = useState({
    title: '',
    content: '',
    imageUrl: '',
    hashtags: '',
  });

  const [error, setError] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const formatedHashtags = !details.hashtags
      ? []
      : details.hashtags.split(' ');
    const formatedDetails = {
      ...details,
      hashtags: formatedHashtags,
    };
    const url = process.env.URL! || 'http://localhost:4000';

    axios
      .post(`${url}/posts/`, formatedDetails, {
        headers: { 'x-auth-token': localStorage.getItem('auth-token') },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Post Utworzony pomyślnie',
          showConfirmButton: false,
          timer: 1500,
        });
        history.push('/posts/1');
      })
      .catch((er) => {
        setError(er.response.data);
      });
  };

  return (
    <Form>
      <FormInner>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="title">Tytuł</Label>
          <Input
            id="title"
            name="title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setDetails({ ...details, title: e.target.value })
            }
            type="text"
            value={details.title}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">Treść</Label>
          <Input
            id="content"
            name="content"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setDetails({ ...details, content: e.target.value })
            }
            type="text"
            value={details.content}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageUrl">Link do obrazka</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setDetails({ ...details, imageUrl: e.target.value })
            }
            type="text"
            value={details.imageUrl}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="hashtags">Hashtagi</Label>
          <Input
            id="hashtags"
            name="hashtags"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setDetails({ ...details, hashtags: e.target.value })
            }
            type="text"
            value={details.hashtags}
          />
        </FormGroup>
        <SubmitButton onClick={submitHandler}>Dodaj post</SubmitButton>
      </FormInner>
    </Form>
  );
}
