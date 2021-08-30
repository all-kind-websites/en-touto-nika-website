import CategoryGridTile from "./CategoryGridTile";
import CategoryGridTileNoTimer from "./CategoryGridTileNoTimer";
import navNames from "../../constants/navNames";
import { history } from '../../App';

// import { GameStatusMulti } from "./imageHandler";

const renderGridItemHandler = (
  gamesStatus: any,
  navigationName: string,
  timer: boolean
) => {

  const renderGridItem = (game: { id: string, title: string }): any => {

    const getNavigationName = () =>
      game.id === "mixed" ? navNames.mixedChooseCategories : navigationName;

    if (timer) {
      return (
        <CategoryGridTile
          gamesStatus={gamesStatus}
          navigationName={navigationName}
          id={game.id}
          timer={timer}
          title={game.title}
          onClick={() => {
            history.push(getNavigationName())
          }
            // navigation.navigate({
            //   name: getNavigationName(),
            //   params: {
            //     categoryId: game.id,
            //     categoryTitle: game.title,
            //     timer,
            //     gameType,
            //   },
            // })
          }
        />
      );
    }
    return (
      <CategoryGridTileNoTimer
        gamesStatus={gamesStatus}
        id={game.id}
        navigationName={navigationName}
        timer={timer}
        title={game.title}
        onClick={() => {
          history.push(getNavigationName())
        }
          // () =>
          // navigation.navigate({
          //   name: getNavigationName(),
          //   params: {
          //     categoryId: game.id,
          //     categoryTitle: game.title,
          //     timer,
          //     gameType,
          //   },
          // })
        }
      />
    );
  };
  return { renderGridItem };
};

export default renderGridItemHandler;