import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory, } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Menu from "./pages/menu/Menu";
import Home from "./pages/Home";
import Winners from "./pages/menu/Winners";
import Settings from "./pages/menu/Settings";
import Create from "./pages/menu/Create";
import NotFound from "./pages/NotFound";
import Auth from './pages/Auth/Auth';
import Topbar from './components/Topbar';
import './styles/app.scss';

import strings from './constants/strings';
import Donate from './pages/menu/Donate';
import nav from './constants/nav';
import MultiCategories from './pages/game/MultiCategories';
import MultiCategoriesNoTimer from './pages/game/MultiCategoriesNoTimer';
import MixChooseCategories from './pages/game/mix/MixChooseCategories';
import MultiGameNoTimer from './pages/game/multi/MultiGameNoTimer';
import MixMultiGameNoTimer from './pages/game/mix/MixMultiGameNoTimer';
import MixMultiGameWithTimer from './pages/game/mix/MixMultiGameWithTimer';
export const history = createBrowserHistory();

function App() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const allowEntrance = useSelector((state: RootStateOrAny) => state.auth.allowEntrance)

  const userLoggedIn = localStorage.getItem(strings.userData);

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setMenuOpen(false);
    });
  });

  return (
    <Router  >
      <div className="app">
        {!!userLoggedIn || allowEntrance ? <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        {!!userLoggedIn || allowEntrance ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        <div className="app__content">
          <Route render={({ location }) =>
          (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                // in={inProp} 
                timeout={1000}
                classNames="fade"
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <Switch location={location} >
                  {/* Menu */}
                  <Route path={nav.auth} component={Auth} />
                  <Route path={nav.winners} component={Winners} />
                  <Route path={nav.settings} component={Settings} />
                  <Route path={nav.create} component={Create} />
                  <Route path={nav.donate} component={Donate} />

                  {/* Categories */}
                  <Route path={nav.multiCategories} component={MultiCategories} />
                  <Route
                    path={nav.multiCategoriesNoTimer}
                    render={() => <MultiCategoriesNoTimer history={history} />}
                  />

                  {/* Games */}

                  {/* Mix */}
                  <Route path={nav.mixChooseCategories} component={MixChooseCategories} />
                  <Route path={nav.mixMultiGameNoTimer} component={MixMultiGameNoTimer} />
                  <Route path={nav.mixMultiGameWithTimer} component={MixMultiGameWithTimer} />

                  {/* Multi */}
                  <Route path={nav.multiGameNoTimer} component={MultiGameNoTimer} />


                  {/* Basic */}
                  <Route path={nav.not_found} component={NotFound} />
                  <Route path={nav.home} exact render={() => <Home setMenuOpen={setMenuOpen} />} />
                  <Redirect to={nav.not_found} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />

        </div>
      </div>
    </Router>
  );
}

export default App;
