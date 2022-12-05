import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Context, VuiTheme, VuiBox } from 'traderchain-ui';

import Header from 'components/Header';
import Footer from 'components/Footer';
import CommonDialog from 'components/CommonDialog';

import Home from 'pages/Home';
import Trade from 'pages/Trade';
import Invest from 'pages/Invest';
import System from 'pages/System';
import About from 'pages/About';
import Experiment from 'pages/Experiment';

const { VisionUIControllerProvider } = Context;

export default function App() {
  return (    
    <VisionUIControllerProvider>
      <ThemeProvider theme={VuiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} index />
              <Route path="trade" element={<Trade />} />
              <Route path="invest" element={<Invest />} />
              <Route path="system/:systemId" element={<System />} />
              <Route path="about" element={<About />} />
              <Route path="experiment" element={<Experiment />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>              
        </BrowserRouter>    
      </ThemeProvider>
    </VisionUIControllerProvider>
  );
}

function Layout() {  
  return (
    <VuiBox
      sx={({ breakpoints }: any) => ({        
        [breakpoints.up("xl")]: {
          margin: "0 15%"          
        },
      })}
    >
      <Header />
      <VuiBox sx={() => ({
        padding: "30px 15px 50px 15px"
      })}>
        <Outlet />
      </VuiBox>
      <Footer />
      <CommonDialog />
    </VuiBox>
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
