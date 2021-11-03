import { useState } from 'react';
import '../../styles/UI/custom-modal.css';

import Button from "./Button";

interface CustomModalProps {
  textOne: string,
  textTwo: string,
  buttonOneTitle: string,
  buttonTwoTitle: string,
  onClickOne: Function,
  onClickTwo: Function,
  style?: any
}

const CustomModal = ({
  textOne,
  textTwo,
  buttonOneTitle,
  buttonTwoTitle,
  onClickOne,
  onClickTwo,
  style,
}: CustomModalProps) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover)
  }
  return (
    <article className='custom-modal' style={style}>
      <section className='custom-modal__container' >
        <p className='custom-modal__text' >{textOne}</p>
        <p className='custom-modal__text' >{textTwo}</p>
        <div className='custom-modal__buttons-container' >
          <Button
            style={{ width: 120, margin: 30 }}
            disabled={false}
            title={buttonOneTitle}
            onClick={onClickOne}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
          <Button
            style={{ width: 120, margin: 30 }}
            disabled={false}
            title={buttonTwoTitle}
            onClick={onClickTwo}
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
          />
        </div>
      </section>
    </article>
  );
};


export default CustomModal;
