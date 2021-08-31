import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Menu from "./pages/menu/Menu";
import Home from "./pages/Home";
import Winners from "./pages/menu/Winners";
import Settings from "./pages/menu/Settings";
import Create from "./pages/menu/Create";
import NotFound from "./pages/NotFound";
import Auth from './pages/Auth/Auth';
import Topbar from './components/Topbar';
import './styles/app.scss';

import asyncNames from './constants/asyncNames';
import Donate from './pages/menu/Donate';
import navNames from './constants/navNames';
import MultiCategories from './pages/game/MultiCategories';
import MultiCategoriesNoTimer from './pages/game/MultiCategoriesNoTimer';
import MixChooseCategories from './pages/game/mix/MixChooseCategories';
import MultiGameNoTimer from './pages/game/multi/MultiGameNoTimer';
export const history = createBrowserHistory()

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const allowEntrance = useSelector((state: RootStateOrAny) => state.auth.allowEntrance)

  const userLoggedIn = localStorage.getItem(asyncNames.userData);

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setMenuOpen(false);
    });
  });

  return (
    <Router>
      <div className="App">
        {!!userLoggedIn || allowEntrance ? <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        {!!userLoggedIn || allowEntrance ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        <div className="app__content">
          <Switch>
            {/* Menu */}
            <Route path={navNames.auth} component={Auth} />
            <Route path={navNames.winners} component={Winners} />
            <Route path={navNames.settings} component={Settings} />
            <Route path={navNames.create} component={Create} />
            <Route path={navNames.donate} component={Donate} />

            {/* Categories */}
            <Route path={navNames.multiCategories} component={MultiCategories} />
            <Route path={navNames.multiCategoriesNoTimer} component={MultiCategoriesNoTimer} />


            {/* Game */}
            <Route path={navNames.mixChooseCategories} component={MixChooseCategories} />
            <Route path={navNames.multiGameNoTimer} component={MultiGameNoTimer} />


            {/* Basic */}
            <Route path={navNames.not_found} component={NotFound} />
            <Route path="/" exact render={() => <Home setMenuOpen={setMenuOpen} />} />
            <Redirect to={navNames.not_found} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
