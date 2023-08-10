import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "public/workFairy_logo.png";

function Header() {
  const router = useRouter();
  const onClick = useCallback(() => {
    localStorage.removeItem("Token");
    localStorage.removeItem("empName");
    router.push("/login");
  }, [router]);
  const userName =
    typeof window !== "undefined" && localStorage.getItem("empName");

  return (
    <HeaderBlock>
      <HeaderContent>
        <LogoContainer>
          <Link href="/employee">
            <Image src={logo} alt="logo" width={189} height={65} />
          </Link>
          <UserWelcome>
            <p>
              <span>{userName}</span> 님, 반갑습니다!
            </p>
            <LogOutBtn onClick={onClick}>로그아웃 ⇢</LogOutBtn>
          </UserWelcome>
        </LogoContainer>
        <Nav>
          <ul>
            <li>
              <Link href="/employee">
                <a className={router.pathname === "/employee" ? "active" : ""}>
                  전자결재
                </a>
              </Link>
            </li>
            <li>
              <Link href="/employee/history">
                <a
                  className={
                    router.pathname === "/employee/history" ? "active" : ""
                  }
                >
                  전자결재내역
                </a>
              </Link>
            </li>
          </ul>
        </Nav>
      </HeaderContent>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  height: 100px;
  background: ${(props) => props.theme.headerColor};
  box-shadow: 0px 1px 20px rgba(139, 189, 175, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const HeaderContent = styled.div`
  width: 1320px;
  height: inherit;
  /* background: coral; */
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const UserWelcome = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    &:first-child {
      color: #1fbf92;
      margin-left: 5px;
      font-weight: 500;
    }
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    li {
      a {
        color: ${(props) => props.theme.inactiveColor};
        &.active {
          font-weight: 700;
          color: ${(props) => props.theme.activeColor};
        }
      }
    }
  }
`;

const LogOutBtn = styled.button`
  font-size: 12px;
  border: 1px solid #adb5bd;
  padding: 5px 12px;
  margin: 0 5px 4px 5px;
  border-radius: 30px;
  background-color: transparent;
  color: #adb5bd;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #f27676;
    border: 1px solid #f27676;
  }
`;

export default Header;
