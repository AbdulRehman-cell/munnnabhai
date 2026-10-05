import React from 'react';

// 1. Toast Notification Simulation System (as toast.success / toast.error)
// To prevent layout crashes, we define a simple browser alert/console fallback system,
// but styled and clean via web standard APIs or simple inline UI alerts.
export const toast = {
  success: (msg) => {
    // Elegant system notification fallback
    const toastEl = document.createElement('div');
    toastEl.className = 'animate-in';
    toastEl.style.position = 'fixed';
    toastEl.style.bottom = '2rem';
    toastEl.style.right = '2rem';
    toastEl.style.zIndex = '9999';
    toastEl.style.background = 'var(--surface, #1e1e1e)';
    toastEl.style.color = '#10b981'; // Success emerald
    toastEl.style.borderLeft = '4px solid #10b981';
    toastEl.style.padding = '1rem 1.5rem';
    toastEl.style.borderRadius = 'var(--radius, 4px)';
    toastEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toastEl.style.fontFamily = 'monospace';
    toastEl.style.fontSize = '0.85rem';
    toastEl.innerText = `[SUCCESS] ${msg}`;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toastEl.remove(), 500);
    }, 4000);
  },
  error: (msg) => {
    const toastEl = document.createElement('div');
    toastEl.className = 'animate-in';
    toastEl.style.position = 'fixed';
    toastEl.style.bottom = '2rem';
    toastEl.style.right = '2rem';
    toastEl.style.zIndex = '9999';
    toastEl.style.background = 'var(--surface, #1e1e1e)';
    toastEl.style.color = '#ef4444'; // Error red
    toastEl.style.borderLeft = '4px solid #ef4444';
    toastEl.style.padding = '1rem 1.5rem';
    toastEl.style.borderRadius = 'var(--radius, 4px)';
    toastEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toastEl.style.fontFamily = 'monospace';
    toastEl.style.fontSize = '0.85rem';
    toastEl.innerText = `[ERROR] ${msg}`;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toastEl.remove(), 500);
    }, 4000);
  }
};

// 2. Card Component
export function Card({ children, style, className = '' }) {
  return (
    <div 
      className={`card ${className}`} 
      style={{ 
        background: 'var(--surface, #121212)',
        border: '1px solid var(--border, #2A2A2A)',
        borderRadius: 'var(--radius, 4px)',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        ...style 
      }}
    >
      {children}
    </div>
  );
}

// 3. Badge Component
export function Badge({ children, variant = 'primary', style }) {
  let badgeColor = 'var(--primary, #D4AF37)';
  let badgeBg = 'rgba(212, 175, 55, 0.1)';
  
  if (variant === 'warning') {
    badgeColor = '#f59e0b'; // Gold/amber
    badgeBg = 'rgba(245, 158, 11, 0.12)';
  } else if (variant === 'success') {
    badgeColor = '#10b981'; // Emerald
    badgeBg = 'rgba(16, 185, 129, 0.12)';
  } else if (variant === 'neutral') {
    badgeColor = '#9ca3af'; // Gray
    badgeBg = 'rgba(156, 163, 175, 0.12)';
  }

  return (
    <span 
      className="badge" 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: '20px',
        color: badgeColor,
        background: badgeBg,
        border: `1px solid ${badgeColor}33`,
        ...style
      }}
    >
      {children}
    </span>
  );
}

// 4. Button Component
export function Button({ children, onClick, variant = 'primary', style, className = '', disabled, type = 'button' }) {
  let baseStyle = {
    fontFamily: 'inherit',
    fontWeight: '500',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.65rem 1.25rem',
    borderRadius: 'var(--radius, 4px)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ...style
  };

  // Assign class names and dynamic styles matching Lumière design system
  let btnClass = 'btn-primary';
  if (variant === 'secondary') {
    btnClass = 'btn-secondary';
  } else if (variant === 'ghost' || variant === 'danger-ghost') {
    btnClass = 'btn-ghost';
    if (variant === 'danger-ghost') {
      baseStyle.color = '#ef4444';
    }
  }

  return (
    <button 
      type={type}
      className={`${btnClass} ${className}`} 
      onClick={onClick} 
      style={baseStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// 5. Table Component
export function Table({ children, style }) {
  return (
    <div style={{ overflowX: 'auto', width: '100%', marginBottom: '1.5rem', border: '1px solid var(--border, #2A2A2A)', borderRadius: 'var(--radius, 4px)' }}>
      <table 
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.9rem',
          background: 'var(--surface, #121212)',
          color: 'var(--text, #EAEAEA)',
          ...style
        }}
      >
        {children}
      </table>
    </div>
  );
}

// Helper parts for Table
Table.Header = function TableHeader({ children }) {
  return (
    <thead style={{ background: '#181818', borderBottom: '2px solid var(--border, #2A2A2A)' }}>
      {children}
    </thead>
  );
};

Table.Body = function TableBody({ children }) {
  return <tbody>{children}</tbody>;
};

Table.Row = function TableRow({ children, style }) {
  return (
    <tr style={{ borderBottom: '1px solid var(--border, #222222)', transition: 'background 0.15s ease', ...style }}>
      {children}
    </tr>
  );
};

Table.HeaderCell = function TableHeaderCell({ children, style }) {
  return (
    <th style={{ padding: '1rem', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#888888', ...style }}>
      {children}
    </th>
  );
};

Table.Cell = function TableCell({ children, style }) {
  return (
    <td style={{ padding: '1.2rem 1rem', verticalAlign: 'middle', ...style }}>
      {children}
    </td>
  );
};

// 6. Spinner Component
export function Spinner({ style }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0', width: '100%', ...style }}>
      <div 
        style={{
          width: '2.5rem',
          height: '2.5rem',
          border: '3px solid rgba(214, 175, 55, 0.1)',
          borderTop: '3px solid var(--primary, #D4AF37)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// 7. PageHeader Component
export function PageHeader({ eyebrow, title, description, children, style }) {
  return (
    <div 
      className="section-head animate-in" 
      style={{ 
        textAlign: 'left', 
        marginBottom: '2.5rem', 
        borderBottom: '1px solid var(--border, #2A2A2A)', 
        paddingBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        ...style 
      }}
    >
      {eyebrow && <span className="eyebrow" style={{ color: 'var(--primary, #D4AF37)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600' }}>{eyebrow}</span>}
      <h1 className="gradient-text" style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '-0.02em' }}>{title}</h1>
      {description && <p style={{ color: '#aaa', margin: 0, fontSize: '1rem', fontWeight: '300', maxWidth: '700px', lineHeight: '1.5' }}>{description}</p>}
      {children && <div style={{ marginTop: '1.5rem' }}>{children}</div>}
    </div>
  );
}

// 8. Alert Component
export function Alert({ children, variant = 'error', style }) {
  const isError = variant === 'error';
  return (
    <div 
      className={isError ? "alert alert-error animate-in" : "alert alert-success animate-in"}
      style={{ 
        padding: '1rem 1.25rem', 
        borderRadius: 'var(--radius, 4px)', 
        background: isError ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
        border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
        color: isError ? '#f87171' : '#34d399',
        fontSize: '0.9rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        ...style 
      }}
    >
      <span style={{ fontWeight: 'bold' }}>{isError ? '⚠️' : '✓'}</span>
      <div>{children}</div>
    </div>
  );
}

// Main container component or layout helpers inside UI if needed
export default {
  Card,
  Badge,
  Button,
  Table,
  Spinner,
  PageHeader,
  toast,
  Alert
};