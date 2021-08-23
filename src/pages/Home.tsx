import LoginCard from '../components/UI/LoginCard'
import TheotokosIcon from '../components/UI/TheotokosIcon';
import '../styles/home.scss';

export default function Home() {
  return (
    <div className='home' >
      <TheotokosIcon />
      <LoginCard />
    </div>
  )
}
