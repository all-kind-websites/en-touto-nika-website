import nav from "../../constants/nav";

import GridTile from "./GridTile";
import imageHandler from "./imageHandler";
// import imageHandlerCreate from "./imageHandlerCreate";
// import imageHandlerTrueFalse, { GameStatusTrueFalse } from "./imageHandlerTrueFalse";
// import { GameStatusMulti } from './imageHandler'
import imageHandlerMix from "./imageHandlerMix";

// gamesStatus: GameStatusMulti | GameStatusTrueFalse
interface CategoryGridTileProps {
  gamesStatus: any,
  id: string,
  navigationName: string,
  onClick: any,
  timer: boolean,
  title: string,
}

// interface Image {
//   borderColor: any,
//   borderWidth: number,
//   image: string,
//   shadowColor: string
// }
// NOTE:
// We have a separate CategoryGridTileNoTimer, because in case of error,
// CategoryGridTile, would get a gameOn in NoTimerMultiGameScreen.
const CategoryGridTileNoTimer = ({
  gamesStatus,
  id,
  navigationName,
  onClick,
  timer,
  title,
}: CategoryGridTileProps): any => {
  let borderC: string = '', borderW: number = 0, img: string = '';

  if (id === 'mixed') {
    const { borderColor, borderWidth, image } = imageHandlerMix();
    borderC = borderColor; borderW = borderWidth; img = image;
  } else if (navigationName === nav.multiGameNoTimer) {
    const { borderColor, borderWidth, image } = imageHandler(gamesStatus, id, timer);
    borderC = borderColor; borderW = borderWidth; img = image;
  }

  // if (navigationName === nav.trueFalseGameNoTimer) {
  //   const { borderColor, borderWidth, image } = imageHandlerTrueFalse(gamesStatus, id, timer);
  //   borderC = borderColor; borderW = borderWidth; img = image;

  // }
  // if (navigationName === nav.createHome) {
  //   const { borderColor, borderWidth, image } = imageHandlerCreate(id);
  //   borderC = borderColor; borderW = borderWidth; img = image;
  // }

  return (
    <GridTile
      borderColor={borderC}
      borderWidth={borderW}
      image={img}
      onClick={onClick}
      title={title}
    />
  );
};

export default CategoryGridTileNoTimer;