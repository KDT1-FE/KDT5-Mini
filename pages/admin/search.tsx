import { Select } from "antd";
import DataTabel from "@components/common/DataTabel";
import styled from "styled-components";
import AdminHeader from "@components/common/AdminHeader";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { getUserName, getUserNumber, getOrders } from "@lib/api/adminAPI";
import { ISearch } from "@lib/interface/Admin";

function SearchPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const [searchWord, setSearchWord] = useState("");
  const [empNumber, setEmpNumber] = useState(0);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [visible, setVisible] = useState(false);
  const [basicData, setBasicData] = useState<ISearch>({
    createdAt: "",
    empName: "",
    empNo: 0,
    id: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onNameSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        if (searchWord) {
          const fetchData = await getUserName(searchWord);
          const fetchOrderData = await getOrders(fetchData.data.id, 0, 10);
          setBasicData(fetchData.data);
          setPendingOrder(
            fetchOrderData.data.content.filter(
              (data: any) => data.status === "대기",
            ),
          );
          setCompleteOrder(
            fetchOrderData.data.content.filter(
              (data: any) => data.status !== "대기",
            ),
          );
          setVisible(true);
        }
      } catch (e) {
        console.error(e, "실패");
      }
    },
    [searchWord],
  );

  const onNumberSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        if (empNumber) {
          const fetchData = await getUserNumber(empNumber);
          const fetchOrderData = await getOrders(fetchData.data.id, 0, 10);
          setBasicData(fetchData.data);
          setPendingOrder(
            fetchOrderData.data.content.filter(
              (data: any) => data.status === "대기",
            ),
          );
          setCompleteOrder(
            fetchOrderData.data.content.filter(
              (data: any) => data.status !== "대기",
            ),
          );
          setVisible(true);
        }
      } catch (e) {
        console.error(e, "실패");
      }
    },
    [empNumber],
  );

  const handleChangeInput = (event: FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (selectedOption === "1") {
      setSearchWord(value);
    } else {
      setEmpNumber(Number(value));
      console.log(empNumber);
    }
  };

  const options = [
    {
      value: "1",
      label: "사원명",
    },
    {
      value: "2",
      label: "사원번호",
    },
  ];

  return (
    mounted && (
      <>
        <AdminHeader />
        <Search>
          <SearchBar>
            <SearchForm
              onSubmit={selectedOption === "1" ? onNameSubmit : onNumberSubmit}
            >
              <Select
                defaultValue="1"
                options={options}
                onChange={(value: string) => {
                  setSelectedOption(value);
                  console.log(selectedOption);
                }}
              />
              <StyledInput onChange={handleChangeInput} autoFocus />
              <StyeldBtn className="searchBtn">Search</StyeldBtn>
            </SearchForm>
          </SearchBar>
          {visible && (
            <>
              <BasicSection>
                <h3>기본정보</h3>
                <div className="container">
                  <ul>
                    <li>
                      <span>사원명</span>
                      <p>{basicData.empName}</p>
                    </li>
                    <li>
                      <span>사원번호</span>
                      <p>{basicData.empNo}</p>
                    </li>
                    <li>
                      <span>입사일</span>
                      <p>{basicData.createdAt}</p>
                    </li>
                  </ul>
                </div>
              </BasicSection>
              <TableSection>
                <h3>연차 / 당직</h3>
                <div className="details">
                  <DataTabel
                    tableTitle="결재 대기"
                    dataSource={pendingOrder}
                    type={"admin"}
                  />
                  <DataTabel
                    tableTitle="결재 완료"
                    dataSource={completeOrder}
                    type={"admin"}
                  />
                </div>
              </TableSection>
            </>
          )}
        </Search>
      </>
    )
  );
}

const Search = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0;
  margin-bottom: 30px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 30px;
`;
const SearchForm = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 100px auto;
  align-items: center;
  width: 700px;
  height: 50px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
`;

const StyledInput = styled.input`
  height: 100%;
  border: none;
  outline: none;
  padding-bottom: 3px;
  font-size: 14px;
  text-indent: 10px;
`;

const StyeldBtn = styled.button`
  position: absolute;
  right: 15px;
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const BasicSection = styled.section`
  width: 700px;
  .container {
    padding: 20px 30px 30px;
    box-sizing: border-box;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);

    ul {
      width: 30%;
      li {
        margin-top: 20px;
        display: flex;
        span {
          width: 100px;
        }
      }
    }
  }
`;

const TableSection = styled.section`
  margin-top: 30px;
  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 700px;
    padding: 20px 30px 30px;
    box-sizing: border-box;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  }
`;
export default SearchPage;
