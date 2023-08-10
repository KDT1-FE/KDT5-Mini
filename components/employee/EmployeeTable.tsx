import EmployeeDutyModalForm from "@components/employee/EmployeeDutyModalForm";
import { Button, Space } from "antd";
import { styled } from "styled-components";
import SelectModal from "@components/employee/SelectModal";
import { employeeListApi } from "@lib/api/employeeAPI";
import { useEffect, useState } from "react";
import { IDataSourceItem } from "@lib/interface/Admin";
import EmployeeHistoyModal from "@components/employee/EmployeeHistoyModal";

interface selectedTapProps {
  selectedTap: string;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

function EmployeeTable({ selectedTap, toggle }: selectedTapProps) {
  const [datas, setDatas] = useState<IDataSourceItem[]>([]);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [details, setDetails] = useState<IDataSourceItem>();
  const [listUpdate, setListUpdate] = useState(true);

  const openHandler = (data: IDataSourceItem) => {
    setEmployeeOpen(true);
    setDetails(data);
  };

  const setlist = async () => {
    try {
      const res = await employeeListApi();
      const Data = res?.data;
      setDatas(Data.response.content);
      if (!Data.success) {
        console.log("서버로 부터 응답이 왔는데 에러임.");
        return;
      }
    } catch (error) {
      console.error("서버로 부터 응답 안옴", error);
    }
  };

  useEffect(() => {
    setlist();
  }, [listUpdate]);

  return (
    <>
      <EmployeeDutyTable>
        {selectedTap == "전체" ? (
          <h1>전체 결재 현황</h1>
        ) : selectedTap == "연차" ? (
          <h1>연차 결재 현황</h1>
        ) : (
          <h1>당직 결재 현황</h1>
        )}
        {selectedTap == "전체" ? (
          <ul>
            {datas &&
              datas.map((data) => {
                return (
                  <Employeedata
                    key={data.id}
                    onClick={() => {
                      openHandler(data);
                    }}
                  >
                    <Space
                      direction="horizontal"
                      size="middle"
                      style={{ width: "200px" }}
                    >
                      {data.status === "대기" ? (
                        <StanByIcon />
                      ) : data.orderType === "당직" ? (
                        <DutyIcon />
                      ) : (
                        <AnnualIcon />
                      )}
                      <DutyInfo>{data.startDate}</DutyInfo>
                      <DutyInfo>
                        {data.status == "대기"
                          ? `승인 ${data.status}`
                          : `${data.status} 완료`}
                      </DutyInfo>
                    </Space>
                  </Employeedata>
                );
              })}
          </ul>
        ) : (
          <ul>
            {datas &&
              datas
                .filter((data) => {
                  if (selectedTap == "연차") {
                    return data.orderType == "연차";
                  }
                  if (selectedTap == "당직") {
                    return data.orderType == "당직";
                  }
                })
                .map((data) => {
                  return (
                    <Employeedata
                      key={data.id}
                      onClick={() => {
                        openHandler(data);
                      }}
                    >
                      <Space
                        direction="horizontal"
                        size="middle"
                        style={{ width: "200px" }}
                      >
                        {data.status === "대기" ? (
                          <StanByIcon />
                        ) : data.orderType === "당직" ? (
                          <DutyIcon />
                        ) : (
                          <AnnualIcon />
                        )}
                        <DutyInfo>{data.startDate}</DutyInfo>
                        {data.status == "대기"
                          ? `승인 ${data.status}`
                          : `${data.status} 완료`}
                      </Space>
                    </Employeedata>
                  );
                })}
          </ul>
        )}
        <div>
          {selectedTap == "전체" ? (
            <SelectModal setListUpdate={setListUpdate} />
          ) : (
            <EmployeeDutyModalForm
              toggle={toggle}
              setListUpdate={setListUpdate}
            />
          )}
        </div>
        <EmployeeHistoyModal
          employeeOpen={employeeOpen}
          setEmployeeOpen={setEmployeeOpen}
          details={details}
          setListUpdate={setListUpdate}
        />
      </EmployeeDutyTable>
    </>
  );
}

const EmployeeDutyTable = styled.div`
  width: 290px;
  height: 670px;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px 10px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  // overflow: scroll;
  div {
    margin: 0 auto;
  }
  h1 {
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 20px;
  }
  ul {
    height: 530px;
  }
`;
const Employeedata = styled(Button)`
  width: 247px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  justify-content: space-between;
  border: none;
`;
const DutyIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.pointColor.blue};
`;
const AnnualIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.pointColor.yellow};
`;
const StanByIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.pointColor.gray};
`;
const DutyInfo = styled.div`
  color: rgba(12, 12, 12, 1);
`;

export default EmployeeTable;
