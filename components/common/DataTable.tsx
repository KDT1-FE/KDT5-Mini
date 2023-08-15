import { Space, Table } from "antd";
import { useState } from "react";
import ApprovalModal from "@components/admin/ApprovalModal";
import EmployeeHistoyModal from "@components/employee/EmployeeHistoyModal";
import Button from "@components/common/Button";
import type { ColumnsType } from "antd/es/table";
import { IDataTableProps, IDataSourceItem } from "@lib/interface/Admin";

function DataTable({ tableTitle, dataSource, type }: IDataTableProps) {
  const [open, setOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [details, setDetils] = useState<IDataSourceItem>();
  const [listUpdate, setListUpdate] = useState(false);

  const adminOnClickHandler = (data: IDataSourceItem) => {
    setOpen(true);
    setDetils(data);
  };

  const employeeOnClickHandler = (data: IDataSourceItem) => {
    setEmployeeOpen(true);
    setDetils(data);
    setListUpdate(listUpdate);
  };

  //테이블 형식
  const columns: ColumnsType<IDataSourceItem> = [
    {
      title: "사원명",
      dataIndex: "사원명",
      key: "사원명",
      align: "center",
      render: (_, data) => (
        <>
          <p>{data.empName}</p>
        </>
      ),
    },
    {
      title: "결재요청날짜",
      dataIndex: "결재요청날짜",
      key: "결재요청날짜",
      align: "center",
      render: (_, data) => (
        <>
          <p>{data.createdAt}</p>
        </>
      ),
    },
    {
      title: "유형",
      dataIndex: "유형",
      key: "유형",
      align: "center",
      render: (_, data) => (
        <>
          <p>{data.orderType}</p>
        </>
      ),
    },
    {
      title: "승인여부",
      dataIndex: "승인여부",
      key: "승인여부",
      align: "center",
      render: (_, data) => {
        if (data.status === "대기") {
          return (
            <Button
              pending="true"
              onClick={() => {
                type === "admin"
                  ? adminOnClickHandler(data)
                  : employeeOnClickHandler(data);
              }}
            >
              {data?.status}
            </Button>
          );
        } else if (data.status === "승인") {
          return (
            <Button
              accept="true"
              onClick={() => {
                type === "admin"
                  ? adminOnClickHandler(data)
                  : employeeOnClickHandler(data);
              }}
            >
              {data?.status}
            </Button>
          );
        } else {
          return (
            <Button
              deny="true"
              onClick={() => {
                type === "admin"
                  ? adminOnClickHandler(data)
                  : employeeOnClickHandler(data);
              }}
            >
              {data?.status}
            </Button>
          );
        }
      },
    },
  ];

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h4>{tableTitle}</h4>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ y: 240 }}
      />
      {type === "admin" ? (
        <ApprovalModal open={open} setOpen={setOpen} details={details} />
      ) : (
        <EmployeeHistoyModal
          employeeOpen={employeeOpen}
          setEmployeeOpen={setEmployeeOpen}
          details={details}
          setListUpdate={setListUpdate}
        />
      )}
    </Space>
  );
}

export default DataTable;
