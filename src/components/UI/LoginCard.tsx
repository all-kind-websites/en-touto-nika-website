import { useState } from 'react';
import colors from '../../constants/colors';
import '../../styles/UI/login-card.scss';
import Button from './Button';
import InputMaroon from './InputMaroon';

// styles
const noSubEnterButton = {
  height: 50,
  fontSize: 20,
  borderRadius: '35px',
  boxShadow: `1px 1px 8px 3px ${colors.moccasin_light} `,
  border: `1px solid ${colors.moccasin_light} `

}

const LoginCard = (props: any) => {
  const [hover, setHover] = useState(false);
  const [login, setLogin] = useState(false);

  const handleHover = () => {
    setHover(!hover)
  }

  const handleLogin = () => {
    setLogin(!login)
  }

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
            <InputMaroon type='text' placeholder='Όνομα παίκτη' />
          }
          <InputMaroon type='email' placeholder='Ηλεκτρονική διεύθυνση' />
          <InputMaroon type='password' placeholder='Κωδικός πρόσβασης' />
          {!login &&
            <InputMaroon type='password' placeholder='Eπιβεβαίωση κωδικού' />
          }
          <Button title={!login ? 'Εγγραφή' : 'Είσοδος'} onClick={(e: any) => { e.preventDefault() }} style={{ width: '40%', }} />

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

