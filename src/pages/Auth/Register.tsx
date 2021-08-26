
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TheotokosIcon from '../../components/UI/TheotokosIcon'
import LoginCard from '../../components/UI/LoginCard'
import '../../styles/register.scss';
import asyncNames from '../../constants/asyncNames';

export default function Register() {
  const history = useHistory();

  const userIsLoggedIn = !!localStorage.getItem(asyncNames.userData);
  useEffect(() => {
    if (userIsLoggedIn) history.replace('/')
  }, [userIsLoggedIn, history]);

  return (
    <div className='register' >
      <TheotokosIcon />
      <LoginCard />
    </div>
  )
}
