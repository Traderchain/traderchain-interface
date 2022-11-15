import { Divider } from "@mui/material";
import Intro from './components/Intro';
import Investor from './components/Investor';

export default function Home() {

  return (
    <div id="home">
      <Intro />
      <Divider />
      <Investor />
      <Divider />
    </div>
  );
}
