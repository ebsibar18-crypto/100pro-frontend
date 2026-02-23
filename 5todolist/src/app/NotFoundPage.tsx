import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="screen screen-center">
      <h1>페이지를 찾을 수 없어요</h1>
      <Link className="primary-link" to="/home">
        홈으로 이동
      </Link>
    </section>
  )
}
