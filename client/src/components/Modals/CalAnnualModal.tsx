import { useEffect, useState } from 'react';
import { getAnnual } from '@/lib/api';
import { styled } from 'styled-components';
import { getLevel, getPhone } from '@/utils/decode';
import { AnnualData } from '@/lib/types';

export const CalAnnualModal = ({ date }: { date: string }) => {
  const [annual, setAnnual] = useState<AnnualData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAnnual(date);
      setAnnual(data.item);
    })();
  }, []);

  return (
    <Container>
      <DateWrap>{date}</DateWrap>
      <TableContainer>
        <DataWrap>
          <div>No.</div>
          <div>이름</div>
          <div>파트</div>
          <div>직급</div>
          <div>연락처</div>
        </DataWrap>
        {annual.map((item, index) => (
          <DataWrap key={index}>
            <div>{index + 1}</div>
            <div>{item.username}</div>
            <div>{item.deptName}</div>
            <div>{getLevel(item.level)}</div>
            <div>{getPhone(item.phone)}</div>
          </DataWrap>
        ))}
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
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
    flex: 2;
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 3;
    }
  }
`;
