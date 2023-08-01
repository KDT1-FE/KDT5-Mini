import dayjs from "dayjs";
import { DateCount } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useMyStore } from "@/Store/store.ts";


export default function AnnualList({name}:{name:string}) {
  const user =
    useMyStore(state => state.data.find(user => user.name === name));
  const setCount = useAnnualStore(state => state.setCount)
  let totalCount = 0;
  console.log(user);

  user?.annual.forEach((annual) => {
    const count = Number(DateCount({startDate: annual.startDate, endDate: annual.endDate}));
    totalCount = totalCount + count
  });
  setCount(totalCount)
  console.log(totalCount);

  return (
    <>
      <ul>
        {user?.annual.map((annualItem: AnnualType) => (
          <li key={annualItem.id}>
            <p>{annualItem.reason}</p>
            연차 :
            <span>{dayjs(annualItem.startDate).format('YYYY/MM/DD')}</span>~
            <span>{dayjs(annualItem.endDate).format('YYYY/MM/DD')}</span>
            연차 사용일 : {DateCount({startDate:annualItem.startDate, endDate:annualItem.endDate})}
            <span>     </span>승인여부:
            <p>{annualItem.status}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
