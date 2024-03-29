import { Routes, Route } from "react-router-dom";
import { NotFound } from 'App';

import Home from 'pages/SystemT/Home';
import Trade from 'pages/SystemT/Trade';
import Performance from 'pages/SystemT/Performance';

export default function SystemT() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="trade/:symbol" element={<Trade />} />
      <Route path="performance" element={<Performance />} />
      <Route path="*" element={<NotFound />} />
    </Routes>              
  );
}
