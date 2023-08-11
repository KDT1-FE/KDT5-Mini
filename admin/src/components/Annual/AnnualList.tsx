import { theme } from '@styles/theme'
import { styled } from 'styled-components'
import { useAnnualStore } from 'zustandState/store'
import { editAnnual } from '@pages/api/api'

const AnnualList = () => {
  const { data, currentPage, updateDataStatus } = useAnnualStore()

  const onClickEdit = async (status: string, annualId: number) => {
    const statusKorean = status === 'APPROVED' ? '승인' : '반려' // Convert to Korean status
    try {
      await editAnnual(status, annualId)
      updateDataStatus(annualId, statusKorean)
    } catch (error) {
      updateDataStatus(
        annualId,
        data.find((el) => el.annualId === annualId)?.status || ''
      )
      alert(
        '상태를 업데이트하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      )
    }
  }

  return (
    <>
      {data.map((el, v) => (
        <ListContainer key={v}>
          <No>{v + 1 + (currentPage - 1) * 10}</No>
          <Name>{el.member.name}</Name>
          <Position>{el.member.position}</Position>
          <Start>{el.startDate}</Start>
          <End>{el.endDate}</End>
          <State>{el.status}</State>
          <BtnArea>
            {el.status === '미승인' ? (
              <>
                <Btn onClick={() => onClickEdit('APPROVED', el.annualId)}>
                  승인
                </Btn>
                <Btn onClick={() => onClickEdit('REJECTED', el.annualId)}>
                  반려
                </Btn>
              </>
            ) : (
              <></>
            )}
          </BtnArea>
        </ListContainer>
      ))}
    </>
  )
}
const ListContainer = styled.div`
  width: 100%;
  height: 10.01%;
  background-color: transparent;
  border-bottom: 1px solid ${theme.colors.blue.main};
  display: flex;
  justify-content: space-around;
  align-items: center;
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
const End = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const State = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BtnArea = styled.div`
  height: 100%;
  width: 8%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Btn = styled.button`
  width: 50px;
  height: 32px;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid ${theme.colors.gray};
  font-size: 12px;
`

export default AnnualList
