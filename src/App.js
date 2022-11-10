import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Traderchain Interface</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}</p>
      </header>
    </div>
  );
}

export default App;
