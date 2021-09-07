import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import '../styles/animations/correct.scss';
const playAlert = require('alert-sound-notify');

export default function CorrectAnimation(props: any) {
  const [fadeout, setFadeout] = useState(false)
  const container = useRef<HTMLDivElement>(null);
  playAlert.content['ding'] = ['assets/sounds/ding.mp3'];

  useEffect(() => {
    if (container.current !== null) {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: require('./json/correct.json')
      })
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      playAlert('ding');
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
