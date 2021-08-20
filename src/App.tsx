import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Menu from "./navigation/Menu";
import Home from "./pages/Home";
import Winners from "./pages/Winners";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Topbar from './components/Topbar';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setMenuOpen(false);
    });
  });


  return (
    <div className="App">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="content">
        <Switch>
          <Route path="/winners" component={Winners} />
          <Route path="/settings" component={Settings} />
          <Route path="/create" component={Create} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
