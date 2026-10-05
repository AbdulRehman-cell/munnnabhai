import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Book from './pages/Book';
import InquiryDashboard from './pages/InquiryDashboard';
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Sticky Header Navigation */}
      <header className="header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(250, 249, 245, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '1.25rem 2rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          padding: 0
        }}>
          {/* Brand Logo */}
          <Link to="/" className="nav-logo" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            textDecoration: 'none'
          }}>
            LUMIÈRE <span style={{ color: 'var(--primary)', fontWeight: 400 }}>STUDIO</span>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                paddingBottom: '4px',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent'
              })}
            >
              Overview
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                paddingBottom: '4px',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent'
              })}
            >
              The Archive
            </NavLink>
            <NavLink 
              to="/book" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                textDecoration: 'none',
                paddingBottom: '4px',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent'
              })}
            >
              Commission
            </NavLink>
            <NavLink 
              to="/admin/inquiries" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                textDecoration: 'none',
                paddingBottom: '4px',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent'
              })}
            >
              Studio Portal
            </NavLink>
          </nav>

          {/* Header Action Button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/book" className="btn-primary" style={{
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}>
              Commission Session
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/book" element={<Book />} />
          <Route path="/admin/inquiries" element={<InquiryDashboard />} />
                <Route path="/admin" element={<Admin />} />
      </Routes>
      </main>

      {/* Footer */}
      <footer className="footer" style={{
        background: 'var(--surface-2)',
        color: 'var(--text)',
        padding: '5rem 2rem 3rem 2rem',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {/* Studio Identity Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="footer-logo" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                LUMIÈRE
              </span>
              <p style={{
                color: 'var(--muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: '300px'
              }}>
                Chasing the high-desert sun and the quiet moments in between. Formed in Texas, styled for the world.
              </p>
            </div>

            {/* Quick Navigation Column */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem',
                color: 'var(--primary)'
              }}>
                Navigation
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><Link to="/" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.95rem' }}>Overview Portfolio</Link></li>
                <li><Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.95rem' }}>The Archive Gallery</Link></li>
                <li><Link to="/book" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.95rem' }}>Commission Requests</Link></li>
                <li><Link to="/admin/inquiries" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.95rem' }}>Studio Portal</Link></li>
              </ul>
            </div>

            {/* Studio Specifications Column */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem',
                color: 'var(--primary)'
              }}>
                The Austin Studio
              </h4>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-body)' }}>
                3,500 sq. ft. Custom Architectural Daylight Space
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                East Austin, Texas
              </p>
            </div>

            {/* General Contact Column */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem',
                color: 'var(--primary)'
              }}>
                Connect
              </h4>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-body)' }}>
                inquire@lumiere.studio
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                +1 (512) 859-0210
              </p>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{
              color: 'var(--muted)',
              fontSize: '0.85rem',
              margin: 0,
              fontFamily: 'var(--font-body)'
            }}>
              &copy; {new Date().getFullYear()} Lumière Studio. All rights reserves. Architectural and Portrait Commissioning worldwide.
            </p>
            <p style={{
              color: 'var(--muted)',
              fontSize: '0.85rem',
              margin: 0,
              fontFamily: 'var(--font-body)'
            }}>
              Texas Modern Cinematic Heritage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}