import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalStyles } from 'styles/index'
import { Header } from 'components/index'
import bg from 'assets/bgblue.png'
import { ProfileContext } from 'contexts/index'
import { useState } from 'react'

export const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <Outer>
        <img src={bg} />
        <Outlet />
      </Outer>
    </>
  )
}

export const HeaderLayout = () => {
  const [profileImage, setProfileImage] = useState<string>('')

  return (
    <>
      <GlobalStyles />
      <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
        <Header />
      </ProfileContext.Provider>
      <Wrapper>
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  position: relative;
  top: 100px;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 1060px;
`
const Outer = styled.div`
  img {
    width: 100%;
    height: 100vh;
  }
`
