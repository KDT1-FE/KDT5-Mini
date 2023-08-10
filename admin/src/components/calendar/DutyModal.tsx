import { useEffect, useState } from 'react';
import { getDuty, deleteDuty } from '@/lib/api';
import { styled } from 'styled-components';
import { getLevel, getPhone } from '@/utils/decode';
import { DutyData } from '@/lib/types';

const DutyDataInitial = {
  deptName: '',
  email: '',
  id: 0,
  level: '',
  phone: '',
  profileImageUrl: '',
  userId: 0,
  username: '',
};

const DutyModal = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const [duty, setDuty] = useState<DutyData>(DutyDataInitial);

  useEffect(() => {
    (async () => {
      const data = await getDuty(date);
      setDuty(data.item);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = async () => {
    await deleteDuty(duty.id);
    onClose();
    window.location.reload();
  };

  return (
    <Container>
      <Title>금일 당직 인원</Title>
      <DateWrap>{date}</DateWrap>
      <TableContainer>
        <DataWrap>
          <div>이름</div>
          <div>파트</div>
          <div>직급</div>
          <div>연락처</div>
        </DataWrap>
        <DataWrap>
          <div>{duty.username}</div>
          <div>{duty.deptName}</div>
          <div>{getLevel(duty.level)}</div>
          <div>{getPhone(duty.phone)}</div>
        </DataWrap>
        <DeleteButton onClick={handleClickDelete}>당직 삭제</DeleteButton>
      </TableContainer>
    </Container>
  );
};

export default DutyModal;

const Container = styled.div`
  position: relative;
  height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
`;

const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 64px;
`;
const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const DataWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:first-child {
    font-weight: 900;
  }
  div {
    flex: 1;
    &:first-child {
      flex: 1;
    }
    &:nth-child(2) {
      flex: 1.5;
    }
    &:last-child {
      flex: 2;
    }
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 80px;
  height: 30px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  border-radius: 4px;
  border: none;
  outline: none;
  bottom: 20px;
  left: 50%;
  margin-left: -40px;
`;
