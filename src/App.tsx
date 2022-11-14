import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { VuiTheme } from 'traderchain-ui';

import logo from 'assets/images/logo.svg';
import 'assets/css/App.css';
import Home from 'pages/Home';
import About from 'pages/About';
import Experiment from 'pages/Experiment';

export default function App() {
  return (    
    <ThemeProvider theme={VuiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experiment" element={<Experiment />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>              
      </BrowserRouter>    
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Traderchain Interface</p>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>            
            <li><Link to="/notfound">Nothing Here</Link></li>
          </ul>
        </nav>                
      </header>
      <hr />
      
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
