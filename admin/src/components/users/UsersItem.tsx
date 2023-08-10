import { styled } from 'styled-components';
import { userRetire } from '@/lib/api';
import { getLevel, getAuth, getPhone } from '@/utils/decode';
import { Users } from '@/lib/types';

const UsersItem = ({ userList, currentPage }: { userList: Users[]; currentPage: number }) => {
  const handleChangeState = async (dept: string, name: string, userid: number) => {
    const data = await userRetire(userid);
    if (data.response && data.response.status === 400) {
      alert('재직 중인 사용자만 변경 가능합니다.');
      window.location.reload();
    } else {
      alert(`${dept} ${name} 재직 상태 변경 완료`);
      window.location.reload();
    }
  };

  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {userList.map((item, index) => (
        <UserItem key={item.id}>
          <span className="index">{startIndex + index + 1}</span>
          <span className="name">{item.username}</span>
          <span className="dept">{item.deptName}</span>
          <span className="level">{getLevel(item.level)}</span>
          <span className="phone">{getPhone(item.phone)}</span>
          <span className="auth">{getAuth(item.auth)}</span>
          <div className="state">
            <select value={item.status} onChange={() => handleChangeState(item.deptName, item.username, item.id)}>
              <option value="APPROVED">재직중</option>
              <option value="RETIRED">퇴사</option>
            </select>
          </div>
        </UserItem>
      ))}
    </Container>
  );
};

export default UsersItem;

const Container = styled.div`
  width: 100%;
  height: calc(100% / 10);
  box-sizing: border-box;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  span {
    text-align: center;
    flex-basis: 0;
    color: ${props => props.theme.black};
  }
  div {
    text-align: center;
    flex-basis: 0;
  }
  .index {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .phone {
    flex-grow: 1.5;
  }
  .auth {
    flex-grow: 1;
  }
  .state {
    flex-grow: 1;
    select {
      width: 100px;
      height: 30px;
      margin-top: 0;
    }
  }
`;
