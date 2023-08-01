import {  useMyStore } from "@/Store/store.ts";


export default function DutyList({name}:{name:string}) {
  const user =
    useMyStore(state => state.data.find(user => user.name === name));
  return (
    <>
      <ul>
        {user?.duty.map((dutyItem: DutyType) => (
          <li key={dutyItem.id}>
            당직일: {dutyItem.startDate}, 승인여부: {dutyItem.status}
          </li>
        ))}
      </ul>
    </>
  );
}
