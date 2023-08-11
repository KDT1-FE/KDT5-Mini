import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '@/components/common/Pagination';
import {
  selectedStartDateState,
  selectedEndDateState
} from '@/recoil/common/datePicker';
import { IPaginationProps } from '@/types/ICommon';
import { useRecoilState } from 'recoil';
import {
  ISideBarProps,
  IFilterProps,
  IMainProps,
  ILeaveResProps,
  IDutyResProps
} from '@/types/IAdmin';
import { adminState } from '@/recoil/common/modal';
import AdminModal from '@/components/admin/AdminModal';
import dayOffList from '@/api/admin/dayOff';
import dutyOffList from '@/api/admin/duty';
import dayOffRes from '@/api/admin/dayOffStatus';
import dutyRes from '@/api/admin/dutyStatus';
import Loading from '@/components/common/Loading';

export default function RequestList({
  searchValue,
  selectedDepartment,
  selectedPosition,
  selectedRest,
  selectedStatus,
  currentPage,
  onPageChange,
  page
}: ISideBarProps & IFilterProps & IMainProps & IPaginationProps) {
  const [employees, setEmployees] = useState<
    (ILeaveResProps | IDutyResProps)[]
  >([]);
  const [filteredEmployees, setFilteredEmployees] = useState<
    (ILeaveResProps | IDutyResProps)[]
  >([]);
  const [selectedEmployeeReason, setSelectedEmployeeReason] = useState('');
  const [isAdminShow, setIsAdminShow] = useRecoilState(adminState);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [selectedStartDate] = useRecoilState(selectedStartDateState);
  const [selectedEndDate, setSelectedEndDate] =
    useRecoilState(selectedEndDateState);
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = useCallback(
    (newPage: number) => {
      onPageChange(newPage);
    },
    [onPageChange]
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      if (page === 'admin-leave') {
        const responseLeave = await dayOffList();
        const responseDataLeave = responseLeave.data;
        const leaveEmployees = responseDataLeave || [];
        setEmployees(leaveEmployees);
      } else if (page === 'admin-duty') {
        const responseDuty = await dutyOffList();
        const responseDataDuty = responseDuty.data;
        const dutyEmployees = responseDataDuty || [];
        setEmployees(dutyEmployees);
      }
      setTimeout(() => setIsLoading(false), 500);
    };
    fetchEmployees();
  }, [page]);

  useEffect(() => {
    const filterEmployees = () => {
      let newFilteredEmployees = employees;

      if (selectedStartDate && selectedEndDate) {
        const nextDay = new Date(selectedStartDate);
        nextDay.setDate(selectedStartDate.getDate() - 1);

        newFilteredEmployees = newFilteredEmployees.filter(employee => {
          if (page === 'admin-leave') {
            const startDate = (employee as ILeaveResProps).startDate
              ? new Date((employee as ILeaveResProps).startDate)
              : null;
            const endDate = (employee as ILeaveResProps).endDate
              ? new Date((employee as ILeaveResProps).endDate)
              : null;

            return (
              startDate &&
              endDate &&
              nextDay <= startDate &&
              startDate <= selectedEndDate &&
              nextDay <= endDate &&
              endDate <= selectedEndDate
            );
          } else {
            const date = (employee as IDutyResProps).date
              ? new Date((employee as IDutyResProps).date)
              : null;

            return date && nextDay <= date && date <= selectedEndDate;
          }
        });
      }

      if (selectedDepartment !== '계열사') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.department === selectedDepartment
        );
      }

      if (selectedPosition !== '직급') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.position === selectedPosition
        );
      }
      if (page === 'admin-leave' && selectedRest !== '요청') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.type === selectedRest
        );
      }

      if (selectedStatus !== '상태') {
        newFilteredEmployees = newFilteredEmployees.filter(
          employee => employee.status === selectedStatus
        );
      }

      if (searchValue !== '') {
        newFilteredEmployees = newFilteredEmployees.filter(employee =>
          employee.name.includes(searchValue.trim())
        );
      }

      setFilteredEmployees(newFilteredEmployees);
      const totalPages = Math.ceil(newFilteredEmployees.length / itemsPerPage);
      if (currentPage >= totalPages) {
        onPageChange(totalPages > 0 ? 0 : 0);
      }
    };
    filterEmployees();
  }, [
    selectedDepartment,
    selectedPosition,
    searchValue,
    selectedStatus,
    selectedRest,
    employees,
    page,
    selectedStartDate,
    selectedEndDate,
    onPageChange,
    currentPage
  ]);

  const handleApproval = async (employee: ILeaveResProps | IDutyResProps) => {
    try {
      if (window.confirm('승인 후 수정불가능합니다. 승인하시겠습니까?')) {
        if ('dayOffId' in employee) {
          await dayOffRes({ dayOffId: employee.dayOffId, status: '승인됨' });
          alert('승인되었습니다.');
        } else {
          await dutyRes({ dutyId: employee.dutyId, status: '승인됨' });
          alert('승인되었습니다.');
        }

        // 승인된 후 데이터를 업데이트
        const updatedEmployees = employees.map(emp => {
          if (emp === employee) {
            return { ...emp, status: '승인됨' };
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      alert('승인 실패하였습니다.');
    }
  };

  const handleRejection = async (employee: ILeaveResProps | IDutyResProps) => {
    try {
      if (window.confirm('거절 후 수정불가능합니다. 거절하시겠습니까?')) {
        if ('dayOffId' in employee) {
          await dayOffRes({ dayOffId: employee.dayOffId, status: '거절됨' });
          alert('거절되었습니다.');
        } else {
          await dutyRes({ dutyId: employee.dutyId, status: '거절됨' });
          alert('거절되었습니다.');
        }

        // 거절된 후 데이터를 업데이트
        const updatedEmployees = employees.map(emp => {
          if (emp === employee) {
            return { ...emp, status: '거절됨' };
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      alert('거절 실패하였습니다.');
    }
  };

  return (
    <>
      {isAdminShow && <AdminModal reason={selectedEmployeeReason} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentPageData.map(employee => (
            <div
              key={
                page === 'admin-duty'
                  ? (employee as IDutyResProps).dutyId
                  : (employee as ILeaveResProps).dayOffId
              }
              className={`flex border-solid border-b-[1px] justify-between h-[45px] items-center `}>
              <div className="w-[8rem] text-center font-semibold">
                {employee.type}
              </div>
              <div className="w-[12rem] text-center">{employee.name}</div>
              <div className="w-[10rem] pl-10 text-center">
                {employee.department}
              </div>
              <div className="w-[8rem] pl-8 text-center">
                {employee.position}
              </div>
              <div className="text-center pl-6 w-[13rem]">
                {employee.hireDate}
              </div>

              {page === 'admin-duty' && 'date' in employee ? (
                <div className="w-[18rem] justify-center flex pr-4 text-center">
                  {employee.date}
                </div>
              ) : 'startDate' in employee && 'endDate' in employee ? (
                <button
                  onClick={() => {
                    setSelectedEmployeeReason(employee.reason);
                    setIsAdminShow(true);
                  }}
                  className="w-[18rem] justify-center flex hover:underline text-secondaryGray text-center">
                  {`${employee.startDate} ~ ${employee.endDate}`}
                </button>
              ) : null}

              <div className="w-[10rem] item-center flex justify-center">
                {(() => {
                  if (employee.status === '대기중') {
                    return (
                      <div className="w-[4rem] h-[28px] text-white rounded-md item-center flex justify-center bg-mainOrange">
                        {employee.status}
                      </div>
                    );
                  } else if (employee.status === '거절됨') {
                    return (
                      <div className="w-[4rem] h-[28px] text-white rounded-md item-center flex justify-center bg-secondary">
                        {employee.status}
                      </div>
                    );
                  } else if (employee.status === '취소') {
                    return (
                      <div className="w-[4rem] h-[28px] text-white rounded-md item-center flex justify-center bg-primary">
                        {employee.status}
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-[4rem] h-[28px] text-white rounded-md item-center flex justify-center bg-mainBlue">
                        {employee.status}
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="w-[12rem] text-center">
                {employee.status === '대기중' && (
                  <>
                    <button
                      onClick={() => handleApproval(employee)}
                      className="w-[4rem] border-solid border-2 rounded-md mr-1 border-mainBlue text-mainBlue">
                      승인
                    </button>
                    <button
                      onClick={() => handleRejection(employee)}
                      className="w-[4rem] border-solid border-2 rounded-md border-secondary text-secondary">
                      거절
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <div className="flex items-end justify-center ">
        <Pagination
          pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
