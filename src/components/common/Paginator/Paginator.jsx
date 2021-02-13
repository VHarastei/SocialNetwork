import React from 'react';

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={props.styles.pagination}>
      {pages.map((p) => {
        return (
          <span
            key={p}
            onClick={(e) => {
              props.onChangeCurrentPage(p);
            }}
            className={`${
              props.currentPage === p && props.styles.selectedPage
            } ${props.styles.pageSelector}`}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
