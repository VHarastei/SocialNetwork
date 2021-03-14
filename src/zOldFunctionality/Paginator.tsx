import React, { useState } from 'react';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  portionSize?: number;
  styles: any;
  currentPage: number;
  onChangeCurrentPage: (pageNumber: number) => void;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  portionSize = 5,
  styles,
  currentPage,
  onChangeCurrentPage,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize); //
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pagination}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span
              key={p}
              onClick={(e) => {
                onChangeCurrentPage(p);
              }}
              className={`${currentPage === p && styles.selectedPage} ${styles.pageSelector}`}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
