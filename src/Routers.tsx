import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
// import Landing from '@/pages/Landing/Landing';
// import Intro from '@/pages/Landing/Intro';
import BalanceGame from '@/pages/BalanceGame/BalanceGame';
// import TestBE from '@/pages/TestBE';
// import QRTreasure from './pages/QRTreasure/QRTreasure';
// import QRLanding from './pages/QRTreasure/QRLanding';
// import QRAdmin from './pages/QRTreasure/QRAdmin';
// import QRResult from './pages/QRTreasure/QRResult';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home/Home';
import Event from '@/pages/Event/Event';
import ResultPage from './pages/BalanceGame/_ResultPage';
export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/event' element={<Event />} />

          {/* <Route path='/klandingk' element={<Landing />} />
          <Route path='/intro' element={<Intro />} /> */}

          <Route path='/balancegame'>
            <Route index element={<BalanceGame />} />
            <Route path='result/:id' element={<ResultPage />} />
          </Route>

          {/* <Route path='/qrtreasure'>
            <Route index element={<QRLanding />} />
            <Route path='map' element={<QRTreasure />} />
            <Route path='admin' element={<QRAdmin />} />
            <Route path='result' element={<QRResult />} />
          </Route>

          <Route path='/test-be' element={<TestBE />} /> */}

          {/* 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
