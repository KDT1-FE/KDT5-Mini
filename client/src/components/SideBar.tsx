import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';
import AnnualBtn from '@/components/Buttons/AnnualBtn';
import DutyBtn from '@/components/Buttons/DutyBtn';
import { dname, getLevel } from '@/utils/decode';
import { logout, getMyPage } from '@/lib/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginState, UserState } from '@/states/stateLogin';
import { UserDataState } from '@/states/stateUserdata';

interface MenuItemProps {
  to: string;
  onClick?: () => void;
  isactive?: string;
}

interface SubMenuProps {
  open?: boolean;
}

interface ProgressProps {
  $percent: number;
}

const SideBar = () => {
  const [User, setUser] = useRecoilState(UserDataState);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMyPageActive, setIsMyPageActive] = useState('false');
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setUserState = useSetRecoilState(UserState);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getMyPage();
      setUser(data.item);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //그래프 퍼센트 계산
  const percentData = (data: number, max: number) => {
    return Math.floor((data / max) * 100);
  };

  const handleClickMyPage = () => {
    setIsSubMenuOpen(true);
  };

  const handleClickMenu = () => {
    setIsSubMenuOpen(false);
    setIsMyPageActive('false');
  };

  const handleClickSubMenu = () => {
    setIsMyPageActive('true');
  };

  const handleClickLogout = async () => {
    await logout();
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserState('');
    navigate('/login');
  };

  return (
    <Container>
      <NavLink to={'/'}>
        <Logo></Logo>
      </NavLink>
      <Menu>
        <MenuItem to="/" onClick={handleClickMenu}>
          <AiOutlineClockCircle />
          <span>전체 캘린더</span>
        </MenuItem>
        <MenuItem to="/request" onClick={handleClickMenu}>
          <FaRegPaperPlane />
          <span>요청 내역 확인</span>
        </MenuItem>
        <MenuItem to="/userinfo" onClick={handleClickMyPage} isactive={isMyPageActive}>
          <BsFillPersonFill />
          <span className="mypage">마이페이지</span>
        </MenuItem>
      </Menu>
      <SubMenu open={isSubMenuOpen}>
        <SubMenuItem to="/userinfo" onClick={handleClickSubMenu}>
          개인정보 수정
        </SubMenuItem>
        <SubMenuItem to="/password" onClick={handleClickSubMenu}>
          비밀번호 변경
        </SubMenuItem>
      </SubMenu>

      <Wrapper>
        <UserInfo>
          <span className="user-name">{User.name}</span>
          <span className="user-dept">{dname[User.deptId]}</span>
          <span className="user-level">{getLevel(User.level)}</span>
        </UserInfo>
        <UserSchedule>
          <DataRow>
            <span className="label">남은 연차</span>
            <ProgressBar>
              <Progress className="annual" $percent={percentData(User.annual, 15)}></Progress>
            </ProgressBar>
            <span className="label-date">{User.annual}일</span>
          </DataRow>
          <DataRow>
            <span className="label">이번달 당직</span>
            <ProgressBar>
              <Progress className="duty" $percent={percentData(User.duty, 3)}></Progress>
            </ProgressBar>
            <span className="label-date">{User.duty}일</span>
          </DataRow>
        </UserSchedule>
        <AnnualBtn />
        <DutyBtn />
        <LogoutBtn onClick={handleClickLogout}>로그아웃</LogoutBtn>
        <Mark>©Dr.Cal</Mark>
      </Wrapper>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const Logo = styled.div`
  margin-top: 60px;
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 160px;
  height: 35px;
  background-position: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
`;

const MenuItem = styled(NavLink)<MenuItemProps>`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    box-sizing: border-box;
    height: 24px;
  }
  &.active {
    color: ${props => props.theme.primary};
    span {
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }
  .mypage {
    border-bottom: ${props => (props.isactive == 'true' ? '2px' : '0')} solid ${props => props.theme.primary};
  }
`;

const SubMenu = styled.div<SubMenuProps>`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;

const SubMenuItem = styled(NavLink)`
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.theme.lightGray};
  &.active {
    font-weight: 700;
    color: ${props => props.theme.black};
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: baseline;
  width: 240px;
  .user-name {
    margin-right: 10px;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .user-dept,
  .user-level {
    margin-right: 5px;
    font-size: 0.75rem;
    color: ${props => props.theme.gray};
  }
`;

const UserSchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  gap: 16px;
  margin-bottom: 20px;
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .progress-wrap {
    display: flex;
    align-items: center;
  }
  .label {
    width: 80px;
  }
  .label-date {
    width: 40px;
    text-align: right;
  }
`;

const ProgressBar = styled.div`
  width: 90px;
  height: 5px;
  border-radius: 30px;
  background-color: ${props => props.theme.middleGray};
`;

const Progress = styled.div<ProgressProps>`
  width: ${props => props.$percent + '%'};
  height: 100%;
  border-radius: 30px;
  background-color: ${props => props.theme.primary};
`;

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  margin-top: 20px;
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;

const Mark = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGray};
`;
