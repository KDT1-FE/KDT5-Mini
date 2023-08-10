import AdminHeader from "@components/common/AdminHeader";
import DataTabel from "@components/common/DataTabel";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPendingOrders, getCompletedOrders } from "@lib/api/adminAPI";
import { IDataSourceItem } from "@lib/interface/Admin";
// import { useQuery } from "@tanstack/react-query";

function Approval() {
  const [mounted, setMounted] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<IDataSourceItem[]>([]);
  const [completedOrders, setCompletedOrders] = useState<IDataSourceItem[]>([]);

  // const pendingQuery = useQuery({
  //   queryKey: ["pending"],
  //   queryFn: getPendingOrders,
  // });

  // const completedQuery = useQuery({
  //   queryKey: ["completed"],
  //   queryFn: getCompletedOrders,
  // });

  useEffect(() => {
    setMounted(true);
    getPendingList();
    getCompletedList();
  }, []);

  const getPendingList = async () => {
    try {
      const { data } = await getPendingOrders();
      setPendingOrders(data.response.content);
      console.log("pending data", data.response.content);
    } catch (error) {
      console.log("대기 조회 실패", error);
    }
  };

  const getCompletedList = async () => {
    try {
      const { data } = await getCompletedOrders();
      console.log("completed data", data.response.content);
      setCompletedOrders(data.response.content);
    } catch (error) {
      console.log("완료 조회 실패", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPendingOrders();
      setPendingOrders(data.response.content);
      console.log("pending data", data.response.content);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCompletedOrders();
      console.log("completed data", data.response.content);
      setCompletedOrders(data.response.content);
    };
    fetchData();
  }, []);

  return (
    mounted && (
      <>
        <AdminHeader />
        <Container>
          <div className="details">
            <DataTabel
              tableTitle={"결재 대기"}
              dataSource={pendingOrders}
              type={"admin"}
            />
          </div>
          <div className="details">
            <DataTabel
              tableTitle={"결재 완료"}
              dataSource={completedOrders}
              type={"admin"}
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
    margin-bottom: 70px;
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

export default Approval;
