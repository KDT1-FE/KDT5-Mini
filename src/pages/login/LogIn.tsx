import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './LogIn.module.scss'
import { loginApi } from '@/api/user'
import { setCookie, getCookie } from '@/utils/cookie'
import { EmailInput, PasswordInput } from '@/components/loginSignupRegex/regexValid'

const LogIn = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const token = getCookie('token') || ''
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (token && user.role) {
      alert('이미 로그인 되어있습니다')
      navigate(-1)
    }
  }, [])

  const handleEmailValidate = (isValid: boolean) => {
    setIsEmailValid(isValid)
  }

  const handlePasswordValidate = (isValid: boolean) => {
    setIsPasswordValid(isValid)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await loginApi({ email: loginEmail, password: loginPassword })
    if (res) {
      if (Array.isArray(res)) {
        alert(res[0])
      } else {
        setCookie('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        res.user.role === 'ROLE_USER' ? navigate('/') : navigate('/admin/employee')
      }
    }
  }

  return (
    <form className={style.container} onSubmit={handleLogin}>
      <img className={style.img} src="/logo.png" alt="로고" />
      <div className={style.box}>
        <h1 className={style.title}>로그인</h1>
        <EmailInput
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          onValidate={handleEmailValidate}
        />
        <PasswordInput
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          onValidate={handlePasswordValidate}
        />
        <button
          className={`${style.loginButton} ${isEmailValid && isPasswordValid ? '' : style.disabled}`}
          type="submit"
          disabled={!isEmailValid || !isPasswordValid}
        >
          로그인
        </button>
        <Link className={style.signupLink} to="/signup">
          회원가입
        </Link>
      </div>
    </form>
  )
}

export default LogIn
