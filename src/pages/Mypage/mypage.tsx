import useDataQuery from "../../Hooks/useData-Query.tsx";


/*
  - 개인별
    1. 연차 목록을 리스트 한다.
    2. 당직 목록을 리스트 한다.
    3. 수정, 삭제 기능을 추가한다. - reduce 사용하여 한 컴포넌트에서 action 관리
    4. Mutation - Custom Hook 에서 Store 관리
  */

export default function Mypage() {


  const { getPageData } = useDataQuery();
  const { isLoading, error, data: myData } = getPageData;
  console.log(myData);

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <>
      {myData.map((user: MyDataUser, index: number) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>총 연차 날 수 : {user.annualBalance}</p>
          <h3>연차 리스트</h3>
          <ul>
            {user.annual.map((annualItem: AnnualType) => (
              <li key={annualItem.id}>
                {annualItem.reason}, Start Date: {annualItem.startDate}, End Date: {annualItem.endDate}, Status: {annualItem.status}
              </li>
            ))}
          </ul>
          <h3>당직 리스트</h3>
          <ul>
            {user.duty.map((dutyItem:DutyType) => (
              <li key={dutyItem.id}>
                Start Date: {dutyItem.startDate}, End Date: {dutyItem.endDate}, Status: {dutyItem.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
