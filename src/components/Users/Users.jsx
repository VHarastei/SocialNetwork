import React from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = (props) => {
  return (
    <div>
      <Paginator
        styles={styles}
        totalItemsCount={props.totalItemsCount}
        pageSize={props.pageSize}
        pages={props.pages}
        onChangeCurrentPage={props.onChangeCurrentPage}
        currentPage={props.currentPage}
        portionSize={10}
      />

      {props.users.map((u) => (
        <User key={u.id} {...props} user={u} />
      ))}
    </div>
  );
};

export default Users;
