import { styled } from 'styled-components'
import { theme } from '@styles/theme'
import EmployeeList from './EmployeeList'

const Employee_Table = () => {
  return (
    <TableArea>
      <NameArea>
        <No>No</No>
        <Name>사원명</Name>
        <Position>직급</Position>
        <Start>입사 일자</Start>
        <Reason>잔여 연차</Reason>
        <State>수행한 당직 일수</State>
        <Btn></Btn>
      </NameArea>
      <ContentArea>
        <EmployeeList />
      </ContentArea>
    </TableArea>
  )
}
const TableArea = styled.div`
  width: 1400px;
  height: 670px;
  border: 1px solid ${theme.colors.blue.main};
  border-radius: 20px;
  overflow: hidden;
`
const NameArea = styled.div`
  width: 100%;
  height: 9.1%;
  background-color: ${theme.colors.blue.main};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  justify-content: space-around;
  color: ${theme.colors.white};
  align-items: center;
  font-size: 16px;
  letter-spacing: -0.05rem;
`
const No = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Name = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Position = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Start = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Reason = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const State = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Btn = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContentArea = styled.div`
  width: 100%;
  height: 90.9%;
  background-color: transparent;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
export default Employee_Table
