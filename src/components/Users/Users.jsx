import React from 'react';
import styles from './Users.module.css';

const Users = (props) => {
  if(props.users.length === 0) {
    props.setUsers(
      [
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
      ]
    )
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <div>
            <img src={u.photoUrl} alt="userPhoto" className={styles.userPhoto}></img>
            {u.followed ? (
              <button onClick={() => props.unfollow(u.id)}> Unfollow </button> ):(
              <button onClick={() => props.follow(u.id)}> Follow </button>
            )}
          </div>
          <div>
            <div>{u.fullName}</div>
            <div>{u.status}</div>
          </div>
          <div>
            <div>{u.location.country}</div>
            <div>{u.location.city}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
