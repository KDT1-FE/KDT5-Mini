import SideBar from '../components/SideBar'
import { styled } from 'styled-components'
import Employee_Table from '@components/Employee/Employee_Table'
import { theme } from '@styles/theme'
import { useEmployeeStore } from 'zustandState/store'
import { useEffect, useState } from 'react'

const Employee = () => {
  const { readEmployee, currentPage, totalCount, searchData, searchCount } = useEmployeeStore();
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(1); 
  const [isSearching, setIsSearching] = useState(false);

  // 검색어가 비어있을 경우 전체 사원 목록을 가져옴
  // 검색어가 비어있지 않고, 유효한 검색을 시도하고 있다면 검색 결과를 가져옴
  useEffect(() => {
    if (search === '') {
      // 검색어가 비어있을 때, 현재 페이지와 오프셋에 해당하는 사원 목록을 가져옴
      readEmployee(offset);
    } else if (isSearching) {
      // 검색어가 비어있지 않고, 유효한 검색을 시도하고 있다면,
      // 해당 검색어와 현재 페이지에 해당하는 검색 결과를 가져옴
      searchData(search, offset);
    }
  }, [offset, search, isSearching]);

  // 검색 아이콘을 클릭했을 때 실행되는 함수
  // 검색어가 비어있지 않다면, 페이지 오프셋을 1로 설정하고 검색 중임을 나타내는 상태를 설정
  // 검색어가 비어있다면 검색 중이 아님을 나타내는 상태를 설정
  const onClickSearch = () => {
    if (search.trim() !== '') {
      // 검색어가 비어있지 않을 경우,
      // 페이지 오프셋을 1로 설정하고, 검색 중임을 나타내는 상태를 true로 설정
      setOffset(1);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // Enter 키를 눌렀을 때 실행되는 함수
  // 검색어가 비어있지 않다면, 페이지 오프셋을 1로 설정하고 검색 중임을 나타내는 상태를 설정
  // 검색어가 비어있다면 검색 중이 아님을 나타내는 상태를 설정
  const OnKeyPress = (e: React.KeyboardEvent) => {
    // Enter 키를 누른 경우,
    if (e.key === 'Enter') {
      if (search.trim() !== '') {
        // 검색어가 비어있지 않을 경우,
        // 페이지 오프셋을 1로 설정하고, 검색 중임을 나타내는 상태를 true로 설정
        setOffset(1);
        setIsSearching(true);
      } else {
        // 검색어가 비어있을 경우,
        // 검색 중임을 나타내는 상태를 false로 설정
        setIsSearching(false);
      }
    }
  };

  // 검색 결과에 따른 총 페이지 수를 계산
  // 검색어가 비어있을 경우 전체 데이터의 페이지 수를 계산하고,
  // 검색어가 있을 경우 검색 결과의 페이지 수를 계산
  const totalPages = search === '' ? Math.ceil(totalCount / 10) : Math.ceil(searchCount / 10);


  return (
    <Wrap>
      <SideBar active={false} />
      <MainArea>
        <LogoArea>
          <Logo src="/imgs/logo.png" />
        </LogoArea>
        <Main>
          <SearchArea>
            <SearchWrap>
              <Search
                placeholder="사원명을 입력해주세요"
                onChange={(e) => {
                  // 입력된 검색어를 상태에 저장
                  setSearch(e.target.value)
                  // 검색 중임을 나타내는 상태를 false로 설정
                  setIsSearching(false);
                }}
                onKeyPress={OnKeyPress} // Enter 키 입력 시 실행될 함수를 지정
              />
              <Icon
                src="/imgs/search-icon.png"
                onClick={() => onClickSearch()}
              />
            </SearchWrap>
          </SearchArea>
          <TableArea>
            <Employee_Table />
          </TableArea>
          <PaginationArea>
            <Pagination>
              <PageUl>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PageLi key={index}>
                  {index + 1 === offset ? (
                    <PageActiveBtn onClick={() => setOffset(index + 1)}>
                      {index + 1}
                    </PageActiveBtn>
                  ) : (
                    <PageBtn onClick={() => setOffset(index + 1)}>
                      {index + 1}
                    </PageBtn>
                  )}
                </PageLi>
              ))}
            </PageUl>
            </Pagination>
          </PaginationArea>
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
const SearchArea = styled.div`
  width: 100%;
  height: 10%;
  padding: 0 85px;
  display: flex;
  align-items: center;
`
const SearchWrap = styled.div`
  width: 270px;
  height: 45px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`
const Search = styled.input`
  outline: none;
  font-size: 15px;
  height: 100%;
  width: 230px;
  border: none;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
const TableArea = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PaginationArea = styled.div`
  width: 100%;
  height: 10%;
`
const Pagination = styled.div`
  width: 100%;
  height: 10%;
`
const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const PageLi = styled.li`
  list-style: none;
`
const PageActiveBtn = styled.button`
  width: 35px;
  height: 35px;
  background-color: ${theme.colors.green};
  border: none;
  border-radius: 6px;
  color: ${theme.colors.white};
  cursor: pointer;
`
const PageBtn = styled.button`
  width: 35px;
  height: 35px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export default Employee
