import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/person.png';
import { NavLink } from 'react-router-dom';

/*[
        {
          id: 1,
          followed: true,
          fullName: 'Vasya H.',
          status: 'React enjoyer',
          location: { country: 'Ukraine', city: 'Khust' },
          photoUrl: 'https://img.icons8.com/plasticine/2x/person-male.png',
        },
        {
          id: 2,
          followed: false,
          fullName: 'Vitalya K.',
          status: 'POE fan',
          location: { country: 'Ukraine', city: 'Perechun' },
          photoUrl: 'https://img.icons8.com/plasticine/2x/person-male.png',
        },
        {
          id: 3,
          followed: false,
          fullName: 'Rostik Kal.',
          status: 'On the verge of extincion',
          location: { country: 'Ukraine', city: 'Dungeon' },
          photoUrl: 'https://img.icons8.com/plasticine/2x/person-male.png',
        },
        {
          id: 4,
          followed: false,
          fullName: 'Igor M.',
          status: 'Just play Duyz',
          location: { country: 'Ukraine', city: 'Muckachevo' },
          photoUrl: 'https://img.icons8.com/plasticine/2x/person-male.png',
        },
      ]*/

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={styles.pagination}>
        {pages.map((p) => {
          return (
            <span
              onClick={(e) => {
                props.onChangeCurrentPage(p);
              }}
              className={`${props.currentPage === p && styles.selectedPage} ${
                styles.pageSelector
              }`}
            >
              {p}
            </span>
          );
        })}
      </div>

      {props.users.map((u) => (
        <div className={styles.userItem} key={u.id}>
          <div>
            <NavLink to={`/profile/${u.id}`}>
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                alt="userPhoto"
                className={styles.userPhoto}
              ></img>
            </NavLink>
            {u.followed ? (
              <button
                onClick={() => props.unfollow(u.id)}
                className={styles.followBtn}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => props.follow(u.id)}
                className={styles.followBtn}
              >
                Follow
              </button>
            )}
          </div>
          <div>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </div>
          {/* <div>
            <div>{'u.location.country'}</div>
            <div>{'u.location.city'}</div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Users;
