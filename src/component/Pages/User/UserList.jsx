import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllUsers,
  getUsersStatus,
  getUsersError,
} from '../../../Features/userSlice';
import TileCard from './TileCard';

const UserList = ({ handleOpen, filter, search }) => {
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  let content;
  if (userStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if ( userStatus === 'succeeded' && search && filter ) {
    content = users.filter((value) => value.name.toLowerCase().includes(search.toLowerCase()) && value.id % 2 === 0 ).map((user) => <TileCard key={user.id} user={user} handleOpen={handleOpen} /> )
  } else if ( userStatus === 'succeeded' && search ) {
    content = users.filter((value) => value.name.toLowerCase().includes(search.toLowerCase()) ).map((user) => <TileCard key={user.id} user={user} handleOpen={handleOpen} /> )
  } else if ( userStatus === 'succeeded' && filter ) {
    content = users.filter((value) => value.id % 2 === 0).map((user) => <TileCard key={user.id} user={user} handleOpen={handleOpen} /> )
  } else if (userStatus === 'succeeded') {
    content = users.map((user) => <TileCard key={user.id} user={user} handleOpen={handleOpen} />)
  } else if (userStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <>{content}</>;
};

export default UserList;
