import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home', { replace: true }), 1200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <section className="splash-screen" aria-label="첫 랜딩 페이지">
      <div className="splash-center-block">
        <h1 className="splash-logo">5늘할일</h1>
        <p className="splash-subcopy">둥근해 미친 거 또 떴네</p>
      </div>
    </section>
  )
}
