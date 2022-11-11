import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

export default function App() {
  return (    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>              
    </BrowserRouter>    
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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/notfound">Nothing Here</Link></li>
          </ul>
        </nav>                
      </header>
      <hr />
      
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
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
