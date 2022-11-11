
export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>REACT_APP_DOMAIN: {process.env.REACT_APP_DOMAIN}</p>
    </div>
  );
}
