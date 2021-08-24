import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import colors from '../../constants/colors';
import '../../styles/UI/login-card.scss';
import Button from './Button';
import Input from './Input';

import * as authActions from "../../store/actions/auth";

// interface State {
//   // name: string,
//   email: string,
//   password: string,
// }
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

  const [hover, setHover] = useState(false);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  // const [state, setState] = useState<State>({ email: '', password: '' })
  const handleHover = () => {
    setHover(!hover)
  }

  const handleLogin = () => {
    setLogin(!login)
  }


  const handleChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case 'email':
        setEmail(target.value)
        break;
      case 'password':
        setPassword(target.value)
        break;

      default:
        break;
    }

  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(email, password);
    let action;
    if (login) {
      action = authActions.login(email, password);
    } else {
      action = authActions.signup(email, password);

    }
    try {
      await dispatch(action);
      if (!login) {
        await dispatch(authActions.changeUserName(name));
        await dispatch(authActions.fetchUserName());
      }
    } catch (err) {
      //Note: only if we have an error we stay in this screen...
    }
  };

  // const isFormValid = ({ email, password }) => email && password;

  // const handleInputError = (errors, input) => {
  //   errors.some(error =>
  //     error.message.toLowerCase().includes(input) ? input : ""
  //   );
  // };

  const goToLoginButtom = {
    width: '30%',
    color: hover ? colors.maroon : colors.moccasin_light,
    backgroundColor: !hover ? colors.chocolate : colors.moccasin_light,
  }
  return (
    <section className='card' style={{ ...props.style }}>
      <div className="container">
        <div className="no-sub-enter-button">
          <Button
            title='Είσοδος χωρίς εγγραφή'
            onClick={() => { }}
            style={noSubEnterButton} />
        </div>
        <form className={`${login && 'userHasAccount'}`} >
          {!login &&
            <Input

              type='text' placeholder='Όνομα παίκτη' />
          }
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            type='email'
            placeholder='Ηλεκτρονική διεύθυνση'
          />
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            type='password' placeholder='Κωδικός πρόσβασης' />
          {!login &&
            <Input type='password' placeholder='Eπιβεβαίωση κωδικού' />
          }
          <Button title={!login ? 'Εγγραφή' : 'Είσοδος'} onClick={handleSubmit} style={{ width: '40%', }} />

        </form>
        <div className="bottom-container">
          <p>{!login ? 'Έχετε λογαρισμό?' : 'Δεν έχετε λογαριασμό?'}</p>
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

