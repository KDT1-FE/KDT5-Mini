import { styled } from 'styled-components'
import SideBar from '../components/SideBar'
import { useEffect, useState } from 'react'
import Annual from '../components/Annual/Annual'
import Duty from '../components/Duty/Duty'
import { theme } from '@styles/theme'
import { useAnnualStore, useDutyStore } from 'zustandState/store'

const Annual_Duty = () => {
  const [active, setActive] = useState(true)
  const { readAnnual } = useAnnualStore()
  const { readDuty } = useDutyStore()

  useEffect(() => {
    readAnnual(1)
    readDuty(1)
  }, [])
  return (
    <Wrap>
      <SideBar active={true} />
      <MainArea>
        <LogoArea>
          <Logo src="/imgs/logo.png" />
        </LogoArea>
        <Main>
          {active ? (
            <Btns>
              <ActiveBtn onClick={() => setActive(true)}>연차</ActiveBtn>
              <UnActiveBtn onClick={() => setActive(false)}>당직</UnActiveBtn>
            </Btns>
          ) : (
            <Btns>
              <UnActiveBtn onClick={() => setActive(true)}>연차</UnActiveBtn>
              <ActiveBtn onClick={() => setActive(false)}>당직</ActiveBtn>
            </Btns>
          )}
          <TableArea>{active ? <Annual /> : <Duty />}</TableArea>
        </Main>
      </MainArea>
    </Wrap>
  )
}
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`
const MainArea = styled.div`
  width: 100%;
  height: 100%;
`
const LogoArea = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
`
const Logo = styled.img`
  margin-left: 10px;
`
const Main = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Btns = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 85px;
`
const ActiveBtn = styled.button`
  background-color: ${theme.colors.blue.main};
  width: 120px;
  height: 50px;
  color: ${theme.colors.white};
  font-size: 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`
const UnActiveBtn = styled.button`
  background-color: ${theme.colors.white};
  width: 120px;
  height: 50px;
  font-size: 16px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`
const TableArea = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Annual_Duty
