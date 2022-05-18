import axios from 'axios';

import BasicContentInfo from '../types/BasicContentInfo';

const getDataWithAuthors = async (
  url: string,
  elements: BasicContentInfo[],
) => {
  const authors = await Promise.all(
    elements.map(async (element: BasicContentInfo) => {
      const author = await (await axios.get(`${url}/users/${element.author}`))
        .data;

      return { ...element, author: author.userName };
    }),
  );
  return authors;
};

export default getDataWithAuthors;
