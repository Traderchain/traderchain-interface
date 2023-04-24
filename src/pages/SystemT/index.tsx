import { Routes, Route } from "react-router-dom";
import { NotFound } from 'App';

import Home from 'pages/SystemT/Home';
import Trade from 'pages/SystemT/Trade';

export default function SystemT() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="trade" element={<Trade />} />
      <Route path="*" element={<NotFound />} />
    </Routes>              
  );
}
