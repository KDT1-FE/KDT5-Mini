import AdminHeader from "@components/common/AdminHeader";
import DataTabel from "@components/common/DataTable";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPendingOrders, getCompletedOrders } from "@lib/api/adminAPI";
import { IDataSourceItem } from "@lib/interface/Admin";
import { Pagination } from "antd";

function Approval() {
  const [pendingOrders, setPendingOrders] = useState<IDataSourceItem[]>([]);
  const [completedOrders, setCompletedOrders] = useState<IDataSourceItem[]>([]);
  const [pendingPage, setPendingPage] = useState(0);
  const [completePage, setCompletePage] = useState(0);
  const [totalPending, setTotalPending] = useState(1);
  const [totalComplete, setTotalComplete] = useState(1);

  useEffect(() => {
    const getPendingList = async () => {
      try {
        const { data } = await getPendingOrders(pendingPage, 10);
        setPendingOrders(data.response.content);
        setTotalPending(data.response.totalElements);
      } catch (error) {
        
        alert("결재 대기 조회 오류 발생하였습니다!");
      }
    };
    getPendingList();
    return () => {
      getPendingList();
    };
  }, [pendingPage]);

  useEffect(() => {
    const getCompletedList = async () => {
      try {
        const { data } = await getCompletedOrders(completePage, 10);
        setCompletedOrders(data.response.content);
        setTotalComplete(data.response.totalElements);
      } catch (error) {
        alert("결재 완료 조회 오류 발생하였습니다!");
      }
    };
    getCompletedList();
  }, [completePage]);

  const handlePendingChange = (page: number) => {
    setPendingPage(page - 1);
  };

  const handleCompleteChange = (page: number) => {
    setCompletePage(page - 1);
  };
  return (
    <>
      <AdminHeader />
      <Container>
        <Details>
          <DataTabel
            tableTitle={"결재 대기"}
            dataSource={pendingOrders}
            type={"admin"}
          />
          <Pagination
            defaultCurrent={1}
            pageSize={10}
            simple={true}
            total={totalPending}
            onChange={(page: number) => handlePendingChange(page)}
          />
        </Details>
        <Details>
          <DataTabel
            tableTitle={"결재 완료"}
            dataSource={completedOrders}
            type={"admin"}
          />
          <Pagination
            defaultCurrent={1}
            pageSize={10}
            simple={true}
            total={totalComplete}
            onChange={(page: number) => handleCompleteChange(page)}
          />
        </Details>
      </Container>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0;
`;

const Details = styled.div`
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 950px;
  padding: 20px 30px 30px;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  gap: 10px;
`;

export default Approval;
