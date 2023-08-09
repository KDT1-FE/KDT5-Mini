import style from './AdminAnnual.module.scss'
import { getAnnualAdminApi, approveAnnualAdminApi, rejectAnnualAdminApi } from '@/api/admin'
import { useState, useEffect } from 'react'
import AdminFilters from '@/components/adminfilter/AdminFilter'
import { getCookie } from '@/utils/cookie'
import { annualAdmin } from '@/types/AdminTypes'
import { SortedData } from '@/utils/SortedData'

const AdminAnnual = () => {
  const [data, setData] = useState<annualAdmin>({ data: [] })
  // 검색
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  // 검색 지연
  const [delayedSearch1, setDelayedSearch1] = useState("");
  const [delayedSearch2, setDelayedSearch2] = useState("");
  //정렬
  const [sort1, setSort1] = useState<"asc" | "desc">("asc");
  const [sort2, setSort2] = useState<"asc" | "desc">("asc");
  const [selectedColumn1, setSelectedColumn1] = useState<"name" | "date">("name");
  const [selectedColumn2, setSelectedColumn2] = useState<"name" | "date">("name");
  // 승인, 거부 버튼
  const [approvedId, setApprovedId] = useState<number | null>(null);
  const [rejectedId, setRejectedId] = useState<number | null>(null);
  
  // 관리자 연차 조회 리스트 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      const response = await getAnnualAdminApi(token);

      if (response) {
        setData({ data: response.data });
      } 
    };

    fetchData();
  }, [approvedId, rejectedId]);

  // 승인 버튼 누를시 
  const handleApprove = async (annualId: number) => {
    const token = getCookie("token");
      await approveAnnualAdminApi(token, annualId);
      setApprovedId(annualId);
  };

  // 거부 버튼 누를시
  const handleReject = async (annualId: number) => {
    const token = getCookie("token");
      await rejectAnnualAdminApi(token, annualId);
      setRejectedId(annualId);   
  };

  // 연차 신청 목록에 있는 사원 검색
  const filteredData1 = data.data
    .filter((item) => item.status === "UNAPPROVED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch1.toLowerCase()));
  // 취소 신청 목록에 있는 사원 검색
  const filteredData2 = data.data
    .filter((item) => item.status === "CANCELED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch2.toLowerCase()));

  // 오름차순 내림차순 정렬
  const sortedData1 = SortedData({
    data:filteredData1, 
    sort:sort1, 
    selectedColumn: selectedColumn1
  });

  const sortedData2 = SortedData({
    data:filteredData2, 
    sort:sort2, 
    selectedColumn: selectedColumn2
  });

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
        <div className={style.caption}>
          <h2 className={style.h2}>연차 신청 목록</h2>
          <div>
          {/* 검색 입력 및 정렬 옵션 박스, 오름차순/내림차순 라디오 버튼들 */}
          <AdminFilters 
            name="sort1"
            search={search1}
            setSearch={setSearch1}
            delayedSearch={delayedSearch1}
            setDelayedSearch={setDelayedSearch1}
            sort={sort1}
            setSort={setSort1}
            selectedColumn={selectedColumn1}
            setSelectedColumn2={setSelectedColumn1}
            columns={[
              { value: "name", text: "사원명" },
              { value: "date", text: "신청 날짜" },
            ]}
          />
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>사원명</th>
                <th className={style.th}>신청 날짜</th>
                <th className={style.th}>승인/거부</th>
              </tr>
            </thead>
            {/* 사원명, 날짜 등 정보 출력 */}
            <tbody>
              {sortedData1.map((employee) => (
                <tr key={employee.annualId} className={style.tr}>
                  <td className={style.td}>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td className={style.td}>{employee.date}</td>
                  <td className={style.td}>
                    <button className={style.approve} onClick={() => handleApprove(employee.annualId)}>
                      승인
                    </button>
                    <button className={style.delete} onClick={() => handleReject(employee.annualId)}>
                      거부
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={style.caption}>
          <h2 className={style.h2}>취소 신청 목록</h2>
          <div>
          {/* 검색 입력 및 정렬 옵션 박스, 오름차순/내림차순 라디오 버튼들 */}
          <AdminFilters
            name="sort2"
            search={search2}
            setSearch={setSearch2}
            delayedSearch={delayedSearch2}
            setDelayedSearch={setDelayedSearch2}
            sort={sort2}
            setSort={setSort2}
            selectedColumn={selectedColumn2}
            setSelectedColumn2={setSelectedColumn2}
            columns={[
              { value: "name", text: "사원명" },
              { value: "date", text: "신청 날짜" },
            ]}
          />
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>사원명</th>
                <th className={style.th}>신청 날짜</th>
                <th className={style.th}>승인/거부</th>
              </tr>
            </thead>
            {/* 사원명, 날짜 등 정보 출력 */}
            <tbody>
              {sortedData2.map((employee) => (
                <tr key={employee.annualId} className={style.tr}>
                  <td className={style.td}>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td className={style.td}>{employee.date}</td>
                  <td className={style.td}>
                    <button className={style.approve} onClick={() => handleApprove(employee.annualId)}>
                      승인
                    </button>
                    <button className={style.delete} onClick={() => handleReject(employee.annualId)}>
                      거부
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminAnnual
