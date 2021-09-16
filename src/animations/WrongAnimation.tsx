import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import '../styles/animations/wrong.css';
const playAlert = require('alert-sound-notify');

export default function WrongAnimation(props: any) {
  const [fadeout, setFadeout] = useState(false)
  const container = useRef<HTMLDivElement>(null);
  playAlert.content['wrong'] = ['assets/sounds/wrong2.wav'];

  useEffect(() => {
    if (container.current !== null) {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: require('./json/wrong.json')
      })
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      playAlert('wrong');
    }, 700);
    setTimeout(() => {
      setFadeout(true);
    }, 3000);
  }, [])



  return (
    <div>
      <div ref={container}
        className={`animation ${fadeout ? 'fade-out' : ''}`}
      >
      </div>
    </div>
  )
}
