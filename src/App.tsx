import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Context } from 'traderchain-ui';
import { VuiTheme, VuiBox } from 'traderchain-ui';

import Header from 'components/Header';

import Home from 'pages/Home';
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
      sx={({ breakpoints, transitions, functions: { pxToRem } }: any) => ({
        p: 3,
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <Header />
      <Outlet />
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
