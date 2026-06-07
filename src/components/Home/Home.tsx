import { useEffect, useState, type FC } from 'react';
import './Home.scss';
import { useSelector } from 'react-redux';
import type { User } from '../../models/user.model';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
  const user = useSelector((state: User) => state.user.user)
  
  return <div className="Home">
    <p>{user?user.firstName : 'אורח'}</p>
  </div>
};

export default Home;
