import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import Quiz from '@/pages/Quiz';
import TestBE from '@/pages/TestBE';
import TestQR from './pages/TestQR';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/test-be' element={<TestBE />} />
          <Route path='/test-qr' element={<TestQR />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
