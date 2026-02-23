import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useAuthStore } from './authStore'
import { authorizeWithKakao } from './kakaoAuth'

const schema = z.object({
  email: z.email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
})

type LoginFormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const login = useAuthStore((state) => state.login)
  const redirectTo = searchParams.get('redirect') ?? '/home'
  const [kakaoError, setKakaoError] = useState('')
  const kakaoReady = Boolean(import.meta.env.VITE_KAKAO_JS_KEY)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'test@test.com', password: '' },
  })

  const onSubmit = () => {
    login('email')
    navigate(redirectTo, { replace: true })
  }

  const onKakaoLogin = async () => {
    if (!kakaoReady) {
      setKakaoError('현재 Kakao 키가 설정되지 않아 이메일 로그인만 사용할 수 있어요.')
      return
    }
    try {
      setKakaoError('')
      await authorizeWithKakao(redirectTo)
    } catch (error) {
      setKakaoError(error instanceof Error ? error.message : '카카오 로그인 준비 실패')
    }
  }

  return (
    <section className="screen login-screen">
      <header className="screen-header login-hero">
        <div className="login-emoji" aria-hidden="true">
          🙂
        </div>
        <h1>
          사용하시려면
          <br />
          로그인 하세요
        </h1>
        <p>3초만에 빠른 회원가입! SNS 계정으로 로그인 하기</p>
      </header>

      <div className="login-panel">
        <button
          type="button"
          className="kakao-button"
          onClick={onKakaoLogin}
          disabled={!kakaoReady}
        >
          카카오 아이디로 로그인
        </button>
        {kakaoError ? (
          <p className="error-text" role="alert" aria-live="polite">
            {kakaoError}
          </p>
        ) : null}

        <div className="login-divider" aria-hidden="true">
          <span />
          <em>Or login with</em>
          <span />
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email
            <input id="email" type="email" {...register('email')} />
            {errors.email ? <span className="error-text">{errors.email.message}</span> : null}
          </label>
          <label>
            Password
            <input id="password" type="password" {...register('password')} />
            {errors.password ? (
              <span className="error-text">{errors.password.message}</span>
            ) : null}
          </label>
          <div className="login-meta-row">
            <label className="login-keep">
              <input type="checkbox" />
              <span className="login-keep-label">로그인 상태 유지</span>
            </label>
            <button type="button" className="link-button login-forgot">
              비밀번호를 잊었나요?
            </button>
          </div>
          <button type="submit" className="login-submit">
            Log In
          </button>
          <div className="login-signup-row">
            <span>아직 회원이 아니세요?</span>
            <button type="button" className="link-button login-signup-button">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
