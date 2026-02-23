import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from './authStore'
import { parseKakaoState } from './kakaoAuth'

export function KakaoCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const state = searchParams.get('state')

  const redirectTo = useMemo(() => parseKakaoState(state)?.redirectTo ?? '/home', [state])
  const hasError = Boolean(error || !code)

  useEffect(() => {
    if (hasError || !code) return
    const savedState = sessionStorage.getItem('kakao_oauth_state')
    sessionStorage.removeItem('kakao_oauth_state')
    if (!savedState || savedState !== state) return
    login('kakao')
    navigate(redirectTo, { replace: true })
  }, [code, hasError, login, navigate, redirectTo, state])

  if (hasError) {
    return (
      <section className="screen screen-center">
        <h1>로그인 처리 중 오류</h1>
        <p className="error-text">카카오 로그인에 실패했습니다.</p>
      </section>
    )
  }

  return (
    <section className="screen screen-center">
      <h1>카카오 로그인 처리 중</h1>
    </section>
  )
}
