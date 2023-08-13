import Calendar from '@/components/main/MainCalendar';
import MainHeader from '@/components/main/MainHeader';
import SideMenu from '@/components/main/MainSideMenu';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import requestSchedules from '@/api/main/schedules';
import {
  dayOffState,
  dutiesState,
  emailState,
  nameState,
  remainDaysState
} from '@/recoil/main';

export default function Main() {
  const [remainDays, setRemainDays] = useRecoilState(remainDaysState);
  const [dayOffs, setDayOffs] = useRecoilState(dayOffState);
  const [duties, setDuties] = useRecoilState(dutiesState);
  const [userName, setUserName] = useRecoilState(nameState);
  const [userEmail, setUserEmail] = useRecoilState(emailState);

  useEffect(() => {
    const schedules = async () => {
      try {
        const request = await requestSchedules();
        const scheduleInfo = request.data;
        setRemainDays(scheduleInfo.dayOffRemains);
        setDayOffs(scheduleInfo.dayOffs);
        setDuties(scheduleInfo.duites);
        setUserName(scheduleInfo.name);
        setUserEmail(scheduleInfo.email);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };
    schedules();
  }, [setDayOffs, setRemainDays, setDuties, setUserEmail, setUserName]);

  return (
    <>
      <div className="w-screen h-screen relative">
        <div className="absolute top-0 left-0 w-full shadow-md">
          <MainHeader />
        </div>
        <div className="w-11/12 absolute top-[7rem] left-0 right-0 mx-auto">
          <div className="absolute top-0 left-0 w-1/6 pt-10">
            <SideMenu />
          </div>
          <div className="absolute top-0 right-0 w-5/6">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}
