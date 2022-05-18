import { useEffect, useState } from 'react';

import axios from 'axios';
import dotenv from 'dotenv';

import topHashtags from '../types/TopHashtags';

dotenv.config();

const useFetchTopHashtags = () => {
  const [hashtags, setTophashtags] = useState<topHashtags[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL: string = process.env.URL! || 'http://localhost:4000';
      const { data } = await axios.get(`${URL}/topHashtags`);
      const names = data.map((d: topHashtags) => d.name);
      setTophashtags(names);
    };
    fetchData();
  }, []);

  return hashtags as topHashtags[];
};

export default useFetchTopHashtags;
