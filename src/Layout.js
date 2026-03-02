import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'rgba(255,87,34,0.95)',
        padding: '1rem',
        zIndex: 1000,
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
      }}>
        <ul style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          listStyle: 'none',
          margin: 0
        }}>
          <li><Link to="/" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>Портфолио</Link></li>
          <li><Link to="/flower-shop" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>Цветочный магазин</Link></li>
          <li><Link to="/yarkiy-mir" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>Яркий Мир (игрушки)</Link></li>
        </ul>
      </nav>
      <div style={{ marginTop: '80px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;