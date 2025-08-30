import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/NavbarComponent';
import ItemsPage from './pages/ItemsPage';
import PartnersPage from './pages/PartnersPage';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-4">
        <Routes>
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="*" element={<ItemsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
