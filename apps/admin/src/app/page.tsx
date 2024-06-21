export default function Home() {
  return (
    <main style={mainStyle}>
      <h1> NX SST Next.js App - Admin </h1>

      <code >
        <h4>NEXT_PUBLIC_EXAMPLE_NAME</h4>
        <h5>{process.env.NEXT_PUBLIC_EXAMPLE_NAME}</h5>
        <br />
        <h4>ENVIRONMENT_NAME</h4>
        <h5>{process.env.ENVIRONMENT_NAME}</h5>
      </code>
    </main>
  );
}

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '0 20px',
  color: '#333',
  textAlign: 'center',
} as const;