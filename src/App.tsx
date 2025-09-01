import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Catalogue from './pages/Catalogue';
import Pricing from './pages/Pricing';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="clients" element={<Clients />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;