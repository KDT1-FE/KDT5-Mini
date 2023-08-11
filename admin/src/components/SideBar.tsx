import { styled } from 'styled-components'
import Link from 'next/link'
import { theme } from '@styles/theme'
import { useRouter } from 'next/router'
import { logout } from '@pages/api/api'

const SideBar = ({ active }) => {
  const router = useRouter()
  const Logout = () => {
    const res = logout()
    res
      .then((res) => {
        if (res.statusCode == 200) {
          alert('로그아웃 성공')
          router.push('/')
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <>
      <SideBarArea>
        <ProfileArea>
          <ProfileImg src="/imgs/profile-example.png" />
          <Profile>
            <ProfileName>I5E1</ProfileName>
            <ProfileStatus>관리자</ProfileStatus>
          </Profile>
        </ProfileArea>
        <MenuArea>
          {active ? (
            <>
              <CustomLink href="/Annual_Duty">
                <ActiveBtn>
                  <Icon1 src="/imgs/plus.png" />
                  연차/당직 관리
                </ActiveBtn>
              </CustomLink>
              <CustomLink href="/Employee">
                <UnActiveBtn>
                  <Icon2 src="/imgs/group.png" />
                  사원 관리
                </UnActiveBtn>
              </CustomLink>
            </>
          ) : (
            <>
              <CustomLink href="/Annual_Duty">
                <UnActiveBtn>
                  <Icon1 src="/imgs/plus.png" />
                  연차/당직 관리
                </UnActiveBtn>
              </CustomLink>
              <CustomLink href="/Employee">
                <ActiveBtn>
                  <Icon2 src="/imgs/group.png" />
                  사원 관리
                </ActiveBtn>
              </CustomLink>
            </>
          )}

          <CustomLink href="/">
            <UnActiveBtn onClick={() => Logout()}>
              <Icon3 src="/imgs/logout.png" />
              로그아웃
            </UnActiveBtn>
          </CustomLink>
        </MenuArea>
      </SideBarArea>
    </>
  )
}
const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.white};
`
const SideBarArea = styled.div`
  background-color: ${theme.colors.black};
  width: 350px;
  height: 100%;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`
const ProfileArea = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ProfileName = styled.div`
  color: ${theme.colors.white};
  font-size: 18px;
`
const ProfileStatus = styled.div`
  width: 55px;
  height: 26px;
  background-color: ${theme.colors.red};
  border-radius: 30px;
  font-size: 12px;
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`
const MenuArea = styled.div`
  width: 100%;
  height: 80%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`
const ActiveBtn = styled.div`
  color: ${theme.colors.white};
  display: flex;
  gap: 10px;
  font-size: 16px;
  align-items: center;
  width: 280px;
  height: 40px;
  background-color: ${theme.colors.blue.main};
  border-radius: 20px;
  padding: 0 20px;
  cursor: pointer;
  text-decoration: none;
`
const UnActiveBtn = styled.div`
  color: ${theme.colors.white};
  display: flex;
  gap: 10px;
  font-size: 16px;
  align-items: center;
  padding: 0 20px;
  width: 280px;
  height: 40px;
  cursor: pointer;
`
const Icon1 = styled.img`
  width: 24px;
  height: 24px;
`
const Icon2 = styled.img`
  width: 24px;
  height: 24px;
`
const Icon3 = styled.img`
  width: 24px;
  height: 24px;
`

export default SideBar
