import React, { MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  setCurrentPage(a: number): void;
  url: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
  margin: 44px 0 0;
  padding: 17px;
  background-color: #ffff;
  border-radius: 15px;
`;

const PageBtn = styled.button<{ active: boolean }>`
  width: 48px;
  height: 42px;
  background-color: ${(props) => (props.active ? '#3D4443' : '#e7e8e6')};
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => (props.active ? '#E7E8E6' : '#3D4443')};
  cursor: pointer;
  margin: 0 8px;
`;

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
  url,
}: PaginationProps) => {
  const history = useHistory();

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const pageNumbers = [];
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);
    for (let i = 0; i < numberOfPages; i += 1) {
      pageNumbers[i] = i + 1;
    }
    setPages(pageNumbers);
  }, [totalPosts, postsPerPage]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const actualUrl = url.slice(0, -1);
    history.push(`${actualUrl}${(e.target as HTMLButtonElement).textContent}`);
    setCurrentPage(+(e.target as HTMLButtonElement).textContent!);
  };

  const activeHandler = (targetNum: number, currentNum: number): boolean => {
    if (targetNum === currentNum) return true;
    return false;
  };

  return (
    <Wrapper>
      {pages.map((number: number) => (
        <PageBtn
          active={activeHandler(currentPage, number)}
          key={number}
          onClick={clickHandler}
          type="button"
        >
          {number}
        </PageBtn>
      ))}
    </Wrapper>
  );
};

export default Pagination;
