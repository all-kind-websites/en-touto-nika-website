import { Link } from 'react-router-dom';
import nav from '../../constants/nav';
import '../../styles/menu/donate.css';

export default function Donate() {
  return (
    <div >
      <Link to={nav.donate} >Donate</Link>

    </div>
  )
}
