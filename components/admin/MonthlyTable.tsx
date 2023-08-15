import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IMonthlyPros, IColumnsData } from "@lib/interface/Admin";

function MonthlyTable({ dataSource }: IMonthlyPros) {
  const columnsData: ColumnsType<IColumnsData> = [
    {
      title: "사원",
      children: [
        {
          title: "사원번호",
          dataIndex: "empNo",
          key: "empNo",
          width: 100,
          align: "center",
          sorter: (a, b) => a.empNo - b.empNo,
          render: (_, data) => <p>{data.empNo}</p>,
        },
        {
          title: "사원명",
          dataIndex: "empName",
          key: "empName",
          width: 80,
          align: "center",
          render: (_, data) => <p>{data.empName}</p>,
        },
      ],
    },
    {
      title: "1월",
      dataIndex: "jan",
      key: "jan",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.jan === 0 ? "" : <p>{data.month.jan}</p>,
    },
    {
      title: "2월",
      dataIndex: "feb",
      key: "feb",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.feb === 0 ? "" : <p>{data.month.feb}</p>,
    },
    {
      title: "3월",
      dataIndex: "mar",
      key: "mar",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.mar === 0 ? "" : <p>{data.month.mar}</p>,
    },
    {
      title: "4월",
      dataIndex: "apr",
      key: "apr",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.apr === 0 ? "" : <p>{data.month.apr}</p>,
    },
    {
      title: "5월",
      dataIndex: "may",
      key: "may",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.may === 0 ? "" : <p>{data.month.may}</p>,
    },
    {
      title: "6월",
      dataIndex: "jun",
      key: "jun",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.jun === 0 ? "" : <p>{data.month.jun}</p>,
    },
    {
      title: "7월",
      dataIndex: "jul",
      key: "jul",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.jul === 0 ? "" : <p>{data.month.jul}</p>,
    },
    {
      title: "8월",
      dataIndex: "aug",
      key: "aug",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.aug === 0 ? "" : <p>{data.month.aug}</p>,
    },
    {
      title: "9월",
      dataIndex: "sept",
      key: "sept",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.sept === 0 ? "" : <p>{data.month.sept}</p>,
    },
    {
      title: "10월",
      dataIndex: "oct",
      key: "oct",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.oct === 0 ? "" : <p>{data.month.oct}</p>,
    },
    {
      title: "11월",
      dataIndex: "nov",
      key: "nov",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.nov === 0 ? "" : <p>{data.month.nov}</p>,
    },
    {
      title: "12월",
      dataIndex: "dec",
      key: "dec",
      width: 70,
      align: "center",
      render: (_, data) =>
        data.month.dec === 0 ? "" : <p>{data.month.dec}</p>,
    },
    {
      title: "합계",
      key: "합계",
      fixed: "right",
      align: "center",
      width: 80,
      sorter: (a, b) => a.total - b.total,
      render: (_, data) => <p>{data.total}</p>,
    },
  ];

  return (
    <>
      <Table
        size="large"
        columns={columnsData}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </>
  );
}

export default MonthlyTable;
