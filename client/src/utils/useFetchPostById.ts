import { useEffect, useState } from 'react';

import axios from 'axios';

import IComment from '../types/IComment';
import Post from '../types/Post';
import getDataWithAuthors from './getDataWithAuthors';

const useFetchPostById = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [postAuthor, setPostAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL: string = process.env.URL! || 'http://localhost:4000';
      try {
        const clientPost = await (await axios.get(`${URL}/posts/${id}`)).data;

        const clientPostAuthor = await (
          await axios.get(`${URL}/users/${clientPost.author}`)
        ).data;

        const pulledComments = await (await axios.get(`${URL}/comments/${id}`))
          .data;

        const clientComments = await getDataWithAuthors(URL, pulledComments);

        setPost(clientPost);
        setPostAuthor(clientPostAuthor.userName);
        setComments(clientComments as IComment[]);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { isLoading, post: { ...post, author: postAuthor }, comments } as {
    isLoading: boolean;
    post: Post;
    comments: IComment[];
  };
};

export default useFetchPostById;
