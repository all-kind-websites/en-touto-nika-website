
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TheotokosIcon from '../../components/UI/TheotokosIcon'
import LoginCard from '../../components/UI/LoginCard'
import '../../styles/auth.scss';
import asyncNames from '../../constants/asyncNames';

export default function Auth() {
  const history = useHistory();

  const userIsLoggedIn = !!localStorage.getItem(asyncNames.userData);
  useEffect(() => {
    if (userIsLoggedIn) history.replace('/')
  }, [userIsLoggedIn, history]);

  return (
    <div className='auth' >
      <TheotokosIcon />
      <LoginCard />
    </div>
  )
}