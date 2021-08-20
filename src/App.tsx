import { Route, Switch } from 'react-router-dom';
import NavBar from "./navigation/Navbar";
import Home from "./pages/Home";
import Winners from "./pages/Winners";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/winners" component={Winners} />
          <Route path="/settings" component={Settings} />
          <Route path="/create" component={Create} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
