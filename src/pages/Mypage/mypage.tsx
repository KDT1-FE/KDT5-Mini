import useDataQuery from "../../Hooks/useData-Query.tsx";
import UserBanner from "@/Components/userBanner/UserBanner.tsx";
import AnnualList from "@/Components/AnnualList/AnnualList.tsx";
import DutyList from "@/Components/DutyList/DutyList.tsx";
/*
  - 개인별
    3. 수정, 삭제 기능을 추가한다. - reduce 사용하여 한 컴포넌트에서 action 관리
    4. Mutation - Custom Hook 에서 Store 관리
    6. 연차 남은 날짜 계산은 신청시 갱신된다.- 반려되면 그 값은 되돌아 간다.
  */

export default function Mypage() {
  const {getPageData} = useDataQuery();
  const { isLoading, error, data: myData } = getPageData;

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }
  const handleUpdate =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    console.log(e.target);
  }
  const handleDelete = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    console.log(e.target);
  }
  return (
    <>
        <div className={'container'}>
          <UserBanner name={myData[1].name} />
          <h3>연차 리스트</h3>
          <AnnualList name={myData[1].name} />
          <h3>당직 리스트</h3>
          <DutyList name={myData[1].name} />
          <button
            onClick={handleUpdate}
          >수정 </button>
          <button
            onClick={handleDelete}
          >삭제</button>
        </div>
    </>
  );
}
