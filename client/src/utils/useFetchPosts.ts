import { useEffect, useState } from 'react';

import axios from 'axios';
import dotenv from 'dotenv';

import Post from '../types/Post';
import getDataWithAuthors from './getDataWithAuthors';

dotenv.config();

const useFetchPosts = (href: string, page: number, postsPerPage: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    const url = href.slice(0, href.length - 2);
    const DB: string = process.env.URL! || 'http://localhost:4000';

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${DB}${url}?page=${page}&limit=${postsPerPage}`,
        );

        const clientPosts = await getDataWithAuthors(
          `${DB}`,
          data.currentPosts,
        );
        setTotalPosts(data.totalPosts);
        setPosts(clientPosts as Post[]);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [href, page, postsPerPage]);
  return { isLoading, totalPosts, posts: [...posts] };
};

export default useFetchPosts;
