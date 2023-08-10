import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { ResetPasswordForm } from 'components/form/index'

export const ResetPassword = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      //이미 로그인한 유저에 대한 예외처리, 토큰 존재한다면, 로그인/회원가입 진입불가
      navigate('/home')
    }
  }, [])

  return (
    <ResetPasswordWrapper>
      <ResetPasswordConatiner>
        <ResetPasswordForm />
      </ResetPasswordConatiner>
    </ResetPasswordWrapper>
  )
}

const ResetPasswordWrapper = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 568px;
  background-color: white;
`

const ResetPasswordConatiner = styled(ResetPasswordWrapper)`
  height: 774px;
  align-items: center;
  justify-content: center;
`
