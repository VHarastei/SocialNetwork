import React, { FC } from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { userType } from '../../types/types';


type PropsType = {
  users:Array<userType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  followingInProgress: Array<number>;
  toggleFollow: (userId: number, followed: boolean) => void;
  onChangeCurrentPage: (pageNumber: number) => void;
}

const Users: FC<PropsType> = ({
  users,
  pageSize,
  totalItemsCount,
  currentPage,
  toggleFollow,
  onChangeCurrentPage,
  followingInProgress,
}) => {
  return (
    <div>
      <Paginator
        styles={styles}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onChangeCurrentPage={onChangeCurrentPage}
        currentPage={currentPage}
        portionSize={10}
      />
      {users.map((u) => (
        <User
          key={u.id}
          followingInProgress={followingInProgress}
          toggleFollow={toggleFollow}
          user={u}
        />
      ))}
    </div>
  );
};

export default Users;
