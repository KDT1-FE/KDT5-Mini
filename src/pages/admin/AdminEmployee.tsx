import { useState, useEffect } from "react";
import style from "./AdminEmployee.module.scss";
import { getUserListApi } from "@/api/admin";
import Pagination from "@/components/pagination/Pagination";
import { userInfo } from "@/types/AdminTypes";
import AdminFilters from "@/components/adminfilter/AdminFilter";
import { getCookie } from "@/utils/cookie";
import { SortedData } from "@/utils/SortedData";

const AdminEmployee = () => {
  const [data, setData] = useState<userInfo[]>([]);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //검색
  const [search, setSearch] = useState("");
  const [delayedSearch, setDelayedSearch] = useState("");
  //정렬
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [selectedColumn, setSelectedColumn] = useState<"name" | "restAnnual" | "workDay">("name");

  // 사원 리스트 출력
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      const response = await getUserListApi(token);
      setData(response.data);
    }
    fetchData();
  }, []);

  // 이름으로 필터링된 데이터 반환
  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(delayedSearch.toLowerCase())
  );

  // 정렬된 데이터 반환
  const sortedData = SortedData<userInfo>({
    data: filteredData,
    sort,
    selectedColumn,
  });

  // 페이지네이션 함수
  const getPaginatedItems = (
    items: userInfo[],
    currentPage: number,
    itemsPerPage: number,
  ): userInfo[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // 현재 페이지에 대한 페이징 처리된 데이터 반환
  const pagenatedData = getPaginatedItems(
    sortedData,
    currentPage,
    itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
      <div className={style.caption}>
        <h2 className={style.h2}>사원 목록</h2>
          <div>
            {/* 검색 입력 및 정렬 옵션 박스, 오름차순/내림차순 라디오 버튼들 */}
            <AdminFilters
              search={search}
              setSearch={setSearch}
              delayedSearch={delayedSearch}
              setDelayedSearch={setDelayedSearch}
              sort={sort}
              setSort={setSort}
              selectedColumn={selectedColumn}
              setSelectedColumn1={setSelectedColumn}
              columns={[
                { value: "name", text: "사원명" },
                { value: "restAnnual", text: "잔여 연차" },
                { value: "workDay", text: "당직 근무일 수" },
              ]}
            />
          </div>
        </div>
        {/* 표 작성 및 데이터 매핑 */}
        <table className={style.table}>
          <thead>
            <tr className={style.tr}>
              <th className={`${style.th} ${style.nameEmail}`}>사원명</th>
              <th className={`${style.th} ${style.nameEmail}`}>이메일</th>
              <th className={`${style.th} ${style.restWork}`}>잔여 연차</th>
              <th className={`${style.th} ${style.restWork}`}>당직 근무일 수</th>
            </tr>
          </thead>
          <tbody>
            {pagenatedData.map((employee: userInfo) => (
              <tr key={employee.id} className={style.tr}>
                <td className={`${style.td} ${style.nameEmail}`}>
                  {employee.name} {employee.employeeNumber.slice(0,5)}</td>
                <td className={`${style.td} ${style.nameEmail}`}>
                  {employee.email}</td>
                <td className={`${style.td} ${style.restWork}`}>
                  {employee.restAnnual}</td>
                <td className={`${style.td} ${style.restWork}`}>
                  {employee.workDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 검색 입력 및 페이지네이션 컴포넌트 */}
        <div className={style.pagenationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminEmployee;
