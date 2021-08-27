import { Link } from 'react-router-dom';
import navNames from '../../constants/navNames';
import '../../styles/menu/donate.scss';

export default function Donate() {
  return (
    <div >
      <Link to={navNames.donate} >Donate</Link>

    </div>
  )
}
