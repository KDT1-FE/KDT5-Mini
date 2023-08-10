import { styled } from 'styled-components'
import { SignInForm } from 'components/form/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Title from 'assets/main.png'

export const SignIn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      //이미 로그인한 유저에 대한 예외처리, 토큰 존재한다면, 로그인/회원가입 진입불가
      navigate('/home')
    }
  }, [])

  return (
    <>
      <SignInWrapper>
        <SignInFrame>
          <SignInContainer>
            <ServiceImage src={Title} />
            <SignInForm />
          </SignInContainer>
        </SignInFrame>
      </SignInWrapper>
    </>
  )
}
const ServiceImage = styled.img``

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex-grow: 1;

  ${ServiceImage} {
    position: absolute;
    top: -200px;
    width: 400px;
    height: 400px;
    z-index: 1;
  }
`
const SignInFrame = styled.div`
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
const SignInContainer = styled.div`
  width: 568px;
  height: 600px;
  background-color: white;
  margin: auto;
  position: absolute;
  top: 190px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
