import { useState } from 'react';
import colors from '../../constants/colors';
import '../../styles/UI/login-card.scss';
import Button from './Button';
import InputMaroon from './InputMaroon';
import TextP from './TextP';

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

  const handleHover = () => {
    setHover(!hover)
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
        <form >
          <InputMaroon type='text' placeholder='Όνομα παίκτη' />
          <InputMaroon type='email' placeholder='Ηλεκτρονική διεύθυνση' />
          <InputMaroon type='password' placeholder='Κωδικός πρόσβασης' />
          <InputMaroon type='password' placeholder='Eπιβεβαίωση κωδικού' />
          <Button title='Εγγραφή' onClick={() => { }} style={{ width: '40%', }} />
        </form>
        <div className="bottom-container">
          <TextP text='Έχετε λογαρισμό?' />
          <Button
            title='Είσοδος'
            onClick={() => { }}
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

