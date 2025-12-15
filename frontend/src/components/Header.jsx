// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header style={{ gridArea: 'header', backgroundColor: 'var(--color-header-bg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/" className="text-white text-decoration-none" style={{ padding: '0.50rem 1,5rem' }}>
        <h5 className="mb-0 fw-bold" style={{ padding: '0.75rem 2rem' }}>
          Gestor Universitario
        </h5>
      </Link>
    </header>
  );
}

export default Header;