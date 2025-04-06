export default function Custom404() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#e53e3e' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a 
        href="/" 
        style={{ 
          color: '#0070f3', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          border: '1px solid #0070f3',
          borderRadius: '4px'
        }}
      >
        Go back to the home page
      </a>
    </div>
  );
} 