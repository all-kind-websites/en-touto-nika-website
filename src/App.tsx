import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";

import Menu from "./navigation/Menu";
import Home from "./pages/Home";
import Winners from "./pages/Winners";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Auth from './pages/Auth/Auth';
import Topbar from './components/Topbar';
import './styles/app.scss';

import asyncNames from './constants/asyncNames';
import Donate from './pages/Donate';

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const allowEntrance = useSelector((state: RootStateOrAny) => state.auth.allowEntrance)

  const userLoggedIn = localStorage.getItem(asyncNames.userData);

  // useEffect(() => {
  //   document.addEventListener("mousedown", () => {
  //     setMenuOpen(false);
  //   });
  // });

  return (
    <Router>
      <div className="App">
        {!!userLoggedIn || allowEntrance ? <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        {!!userLoggedIn || allowEntrance ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
        <div className="content">
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/winners" component={Winners} />
            <Route path="/settings" component={Settings} />
            <Route path="/create" component={Create} />
            <Route path="/donate" component={Donate} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact render={() => <Home setMenuOpen={setMenuOpen} />} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
