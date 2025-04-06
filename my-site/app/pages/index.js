export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#0070f3', textAlign: 'center' }}>Welcome to My Next.js App!</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        This application is deployed using Pulumi and AWS ECS with Fargate.
      </p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: '#f7f7f7', 
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Deployment Features:</h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li>Containerized with Docker</li>
          <li>Running on AWS ECS with Fargate</li>
          <li>Infrastructure defined with Pulumi</li>
          <li>Highly scalable architecture</li>
        </ul>
      </div>
    </div>
  );
} 