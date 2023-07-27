
import useDataQuery from "../../Hooks/useData-Query.tsx";
import { DateCount } from "../../Components/Common/DateCount.ts";
/*
>>>>>>> origin/main
  - 개인별
    1. 연차 목록을 리스트 한다.- 리액트 쿼리를 사용하여 캐쉬 저장
    2. 당직 목록을 리스트 한다.
    3. 수정, 삭제 기능을 추가한다. - reduce 사용하여 한 컴포넌트에서 action 관리
    4. Mutation - Custom Hook 에서 Store 관리
    5. 입사일 계산
    6. 연차 남은 날짜 계산은 신청시 갱신된다.- 반려되면 그 값은 되돌아 간다.
  */

export default function Mypage() {
  const { getPageData} = useDataQuery();
  const { isLoading, error, data: myData } = getPageData;


  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }
  const handleUpdate =  (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    console.log(e.target);
  }
  const handleDelete = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    console.log(e.target);
  }


  return (
    <>
      {myData.map((user: MyDataUser, index: number) => (

        <div key={index}>
          <h2>{user.name}</h2>

          <p>총 연차 날 수 :
            {
              user.annualBalance
            }
          </p>

          <h3>연차 리스트</h3>
          <ul>
            {user.annual.map((annualItem: AnnualType) => (
              <li key={annualItem.id}>
                {annualItem.reason}, 연차 시작일: {annualItem.startDate}, 연차 마지막일: {annualItem.endDate},
                연차사용날짜:<p><DateCount startDate={annualItem.startDate} endDate={annualItem.endDate} /></p>
                승인여부: {annualItem.status}

              </li>
            ))}
          </ul>
          <h3>당직 리스트</h3>
          <ul>
            {user.duty.map((dutyItem: DutyType) => (
              <li key={dutyItem.id}>
                당직일: {dutyItem.startDate}, 승인여부: {dutyItem.status}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpdate}
          >수정 </button>
          <button
            onClick={handleDelete}
          >삭제</button>
        </div>
      ))}
    </>
  );
}
