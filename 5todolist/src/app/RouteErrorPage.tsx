import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function RouteErrorPage() {
  const error = useRouteError()
  const message = (() => {
    if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
    if (error instanceof Error) return error.message
    return '알 수 없는 오류가 발생했습니다.'
  })()

  return (
    <section className="screen screen-center">
      <h1>문제가 발생했습니다</h1>
      <p className="error-text">{message}</p>
    </section>
  )
}
