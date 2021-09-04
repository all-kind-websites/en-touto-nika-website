import { useState } from 'react';
import '../../styles/UI/button.scss';

import Button from "./Button";


interface CustomModalProps {
  textOne: string,
  textTwo: string,
  buttonOneTitle: string,
  buttonTwoTitle: string,
  onClickOne: Function,
  onClickTwo: Function,
}

const CustomModal = ({
  textOne,
  textTwo,
  buttonOneTitle,
  buttonTwoTitle,
  onClickOne,
  onClickTwo,
}: CustomModalProps) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover)
  }
  return (
    <article className='custom-modal'>
      <section className='custom-modal__container' >
        <p className='custom-modal__text' >{textOne}</p>
        <p className='custom-modal__text' >{textTwo}</p>
        <div className='custom-modal__buttons-container' >
          <Button
            disabled={false}
            title={buttonOneTitle}
            onClick={onClickOne}
            // style={goToLoginButtom}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
          <Button
            disabled={false}
            title={buttonTwoTitle}
            onClick={onClickTwo}
            // style={goToLoginButtom}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
        </div>
      </section>
    </article>
  );
};


export default CustomModal;
