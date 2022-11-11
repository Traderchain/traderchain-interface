import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import logo from 'assets/images/logo.svg';
import 'assets/css/App.css';
import Home from 'pages/Home';
import About from 'pages/About';

export default function App() {
  return (    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
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
