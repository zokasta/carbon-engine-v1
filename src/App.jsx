import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App