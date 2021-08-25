import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import colors from '../../constants/colors';
import '../../styles/UI/login-card.scss';
import Button from './Button';
import Input from './Input';

import * as authActions from "../../store/actions/auth";
import Loader from './Loader';
import { formIsValid } from '../../utils/auth-validation';

interface Errors {
  login: string,
  register: string,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const errorsInitialState = {
  login: '',
  register: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// styles
const noSubEnterButton = {
  height: 50,
  fontSize: 20,
  borderRadius: '35px',
  boxShadow: `1px 1px 8px 3px ${colors.moccasin_light} `,
  border: `1px solid ${colors.moccasin_light} `
}

const LoginCard = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [hover, setHover] = useState(false);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(errorsInitialState);

  const handleHover = () => {
    setHover(!hover)
  }

  const handleLogin = () => {
    setLogin(!login)
  }


  const handleChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(target.value)
        break;
      default:
        break;
    }
  };



  const handleSubmit = useCallback(async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log(name, email, password, confirmPassword);
    let action;
    if (formIsValid(setErrors, login, name, email, password, confirmPassword)) {
      if (login) {
        action = authActions.login(email, password);
      } else {
        action = authActions.signup(email, password);
      }
      setIsLoading(true);
      try {
        await dispatch(action);
        if (!login) {
          await dispatch(authActions.changeUserName(name));
          await dispatch(authActions.fetchUserName());
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors(errorsInitialState);
        setIsLoading(false);
        history.replace('/');
      } catch (err) {
        setIsLoading(false);
        console.log(err);

        //Note: only if we have an error we stay in this screen...
      }
    }
  }, [name, email, password, confirmPassword, login, history, dispatch]);


  const goToLoginButtom = {
    width: '30%',
    color: hover ? colors.maroon : colors.moccasin_light,
    backgroundColor: !hover ? colors.chocolate : colors.moccasin_light,
  }
  return (
    <section className='card' style={{ ...props.style }}>
      <div className="card__container">
        <div className="no-sub-enter-button">
          <Button
            title='Είσοδος χωρίς εγγραφή'
            onClick={() => { }}
            style={noSubEnterButton} />
        </div>
        <form className={`${login && 'userHasAccount'}`} >
          {!login &&
            <Input
              name="name"
              value={name}
              onChange={handleChange}
              error={errors.register || errors.name}
              type='text' placeholder='Όνομα παίκτη'
              autoFocus={true}
            />
          }
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.register || errors.login || errors.email}
            type='email'
            placeholder='Ηλεκτρονική διεύθυνση'
          />
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            error={errors.register || errors.login || errors.password}
            type='password' placeholder='Κωδικός πρόσβασης' />
          {!login &&
            <Input
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              error={errors.register || errors.password}
              type='password'
              placeholder='Eπιβεβαίωση κωδικού' />
          }
          {isLoading ?
            <Loader /> :
            <Button title={!login ? 'Εγγραφή' : 'Είσοδος'} onClick={handleSubmit} style={{ width: '40%', }} />}

        </form>
        <div className="bottom-container">
          <p className='question' >{!login ? 'Έχετε λογαρισμό?' : 'Δεν έχετε λογαριασμό?'}</p>
          <Button
            title={login ? 'Εγγραφή' : 'Είσοδος'}
            onClick={handleLogin}
            style={goToLoginButtom}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginCard;

