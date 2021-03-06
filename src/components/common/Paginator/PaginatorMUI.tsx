import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ul: {
    '& button.Mui-selected': {
      '&:hover': { background: '#ff3300' },
    },
  },
});

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
    if (value !== currentPage) {
      onChangeCurrentPage(value);
    }
  };
  const classes = useStyles();

  return (
    <Pagination
      classes={{ root: classes.ul }}
      shape="rounded"
      color="secondary"
      count={pagesCount}
      page={currentPage}
      onChange={handleChange}
    />
  );
};

export default PaginatorMUI;
