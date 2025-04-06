import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>It might have been moved or deleted.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  )
}
