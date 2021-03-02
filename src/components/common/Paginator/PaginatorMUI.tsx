import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (pageNumber: number) => void;
};

const PaginatorMUI: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onChangeCurrentPage,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangeCurrentPage(value);
  };

  return <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />;
};

export default PaginatorMUI;
