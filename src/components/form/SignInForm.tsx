import { styled } from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import { signinTexts } from 'constants/index'
import { signIn } from 'api/account'
import { InputField, StyledButton, SignUpCallToAction } from 'components/index'
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

export const SignInForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const emailProps = [
    setEmail,
    email,
    signinTexts.email,
    signinTexts.emailPh,
    inputRef,
    'text'
  ]
  const passwordProps = [
    setPassword,
    password,
    signinTexts.pwd,
    signinTexts.pwdPh,
    null,
    'password'
  ]

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  //응답이 존재할 시 header내 token값을 localStorage에 저장
  const handleSignIn = async () => {
    try {
      const res: AxiosResponse = await signIn(email, password)
      let headers = res.headers
      if (headers instanceof AxiosHeaders) {
        let jwtToken = headers.get('authorization')
        localStorage.setItem('token', jwtToken as string)
        navigate('/home')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data.error.message
        error && error !== 'Bad credentials'
          ? alert(error)
          : alert(signinTexts.alertText)
      }
    }
  }

  return (
    <StyledForm method="post">
      <InputField fieldProps={emailProps} />
      <InputField fieldProps={passwordProps} />

      <StyledButton
        onClick={e => {
          e.preventDefault()
          handleSignIn()
        }}>
        {signinTexts.btn}
      </StyledButton>

      <SignUpCallToAction />
    </StyledForm>
  )
}
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 150px;
`
