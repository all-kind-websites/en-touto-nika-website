import '../styles/donate.scss'
import { Link } from 'react-router-dom';
import navNames from '../constants/navNames';

export default function Donate() {
  return (
    <div >
      <Link to={navNames.donate} >Donate</Link>

    </div>
  )
}
