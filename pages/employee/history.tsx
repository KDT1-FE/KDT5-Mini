/* eslint-disable react-hooks/exhaustive-deps */
import DataTabel from "@components/common/DataTabel";
import Header from "@components/common/Header";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { employeeListApi } from "@lib/api/employeeAPI";
import { IDataSourceItem } from "@lib/interface/Admin";

function History() {
  const [mounted, setMounted] = useState(false);
  const [datas, setDatas] = useState<IDataSourceItem[]>([]);

  const setlist = async () => {
    const list = await employeeListApi();
    setDatas(list?.data.response.content);
  };

  useEffect(() => {
    setlist();
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <Header />
        <Container>
          <div className="details">
            <DataTabel
              tableTitle={"결재 대기 내역"}
              type={"employee"}
              dataSource={datas.filter((data) => {
                return data.status == "대기";
              })}
            />
          </div>

          <div className="details">
            <DataTabel
              tableTitle={"결재 완료 내역"}
              type={"employee"}
              dataSource={datas.filter((data) => {
                return data.status != "대기";
              })}
            />
          </div>
        </Container>
      </>
    )
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0;

  .details {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 700px;
    padding: 20px 30px 30px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: #e2e2e2 0px 5px 10px;
  }
`;

export default History;
