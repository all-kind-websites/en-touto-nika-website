import '../../styles/UI/theotokos-icon.css';
import { RootStateOrAny, useSelector } from 'react-redux';

const TheotokosIcon = (props: any) => {
  const login = useSelector((state: RootStateOrAny) => state.game.mode);

  return (
    <div className={`theotokos-icon ${!login && "theotokos-icon--small"} `} >
      <img src="assets/panagia-glykofilousa.jpg" alt="theotokos" />
    </div >
  );
};

export default TheotokosIcon;
