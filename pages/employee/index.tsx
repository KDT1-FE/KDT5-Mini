import React, { useEffect } from "react";
import Header from "@components/common/Header";
import EmployeeTableTab from "@components/employee/EmployeeTableTab";
import { styled } from "styled-components";
import { useRouter } from "next/router";

function EmployeePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token === undefined) {
      alert("로그인 하십시오!");
      router.push("/login");
    } else {
      return;
    }
  }, [router]);

  return (
    <>
      <Header />
      <Inner>
        <EmployeeTableTab />
      </Inner>
    </>
  );
}

const Inner = styled.div`
  width: 1200px;
  margin: 100px auto;
  display: flex;
  position: relative;
  justify-content: space-between;
`;
export default EmployeePage;
