import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './SignUp.module.scss'
import { signupApi } from '@/api/user'
import { v4 } from 'uuid'
import { getCookie } from '@/utils/cookie'
import { EmailInput, PasswordInput, NameInput } from '@/components/loginSignupRegex/regexValid'

const SignUp = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [username, setUsername] = useState('')

  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean[]>([false, false, false])

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await signupApi({ email: loginEmail, password: loginPassword, name: username, employeeNumber: v4() })
    if (res) {
      if (Array.isArray(res)) {
        alert(res[0])
      } else {
        alert(res.message)
        navigate('/login')
      }
    }
  }
  useEffect(() => {}, [loginButtonDisabled])

  const token = getCookie('token') || ''
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  useEffect(() => {
    if (token && user.role) {
      alert('이미 로그인 되어있습니다')
      navigate(-1)
    }
  }, [])

  const handleValidate = (isValid: boolean, index?: number) => {
    const updatedLoginButtonDisabled = [...loginButtonDisabled]
    if (index !== undefined) {
      updatedLoginButtonDisabled[index] = isValid
    }
    setLoginButtonDisabled(updatedLoginButtonDisabled)
  }

  return (
    <form className={style.container} onSubmit={handleSignUp}>
      <img className={style.img} src="/logo.png" alt="로고" />
      <div className={style.box}>
        <h1 className={style.title}>회원가입</h1>
        <NameInput value={username} onChange={(e) => setUsername(e.target.value)} onValidate={handleValidate} />
        <EmailInput value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} onValidate={handleValidate} />
        <PasswordInput
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          onValidate={handleValidate}
        />
        <button
          className={`${style.signupButton} ${
            loginButtonDisabled.every((check) => check === true) ? '' : style.disabled
          }`}
          onClick={handleSignUp}
          type="submit"
          disabled={loginButtonDisabled.every((check) => check === true) ? false : true}
        >
          회원가입
        </button>
        <div className={style.loginLinkContainer}>
          <span className={style.des}>이미 계정이 있으신가요?</span>
          <Link className={style.loginLink} to="/login">
            로그인하기
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUp
