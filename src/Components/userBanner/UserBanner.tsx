import { DateCount,  JickCounter } from "@/Common/CommonFunction.ts";
import { useAnnualStore, useUserStore } from "@/Store/store.ts";
import dayjs from "dayjs";

export default function UserBanner({name}:{name:string}) {
  const {users} = useUserStore(state => state)
  const {count} = useAnnualStore(state => state)
  const user = users.find(user => name === user.name)
  const today = dayjs().format('YYYY-MM-DD');
  const totalDays = DateCount({ startDate: user?.joinDate as string, endDate: today})
  const jik = JickCounter(totalDays as string)
  // const count = jik.annualBalance - 총사용연차일수
  const restAnnual = jik.annualBalance - count
  console.log(count);
  return (
    <div>
      <h2>{user?.name} {jik.answer}</h2>
      <p>총 연차 날 수 : {jik.annualBalance}</p>
      <p>총 사용 연차 :  {count} </p>
      <p>잔여연차 : {restAnnual}</p>
    </div>
  )
}
