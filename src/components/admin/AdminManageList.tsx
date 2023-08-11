import React, { useState, useEffect, useRef } from 'react';
import {
  ISideBarProps,
  IFilterProps,
  IDayOffDetailResProps,
  IManageResProps,
  IDutyDetailResProps
} from '@/types/IAdmin';
import Pagination from '@/components/common/Pagination';
import { IPaginationProps } from '@/types/ICommon';
import { useRecoilState } from 'recoil';
import { manageState } from '@/recoil/common/modal';
import reqManage from '@/api/admin/manage';
import detailDayOff from '@/api/admin/modalDayOff';
import detailDuty from '@/api/admin/modalDuty';
import Loading from '@/components/common/Loading';

export default function EmployeeList({
  selectedDepartment,
  selectedPosition,
  searchValue,
  currentPage,
  onPageChange
}: ISideBarProps & IFilterProps & IPaginationProps) {
  const [employees, setEmployees] = useState<IManageResProps[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IManageResProps[]>(
    []
  );
  const [dayOffDetails, setDayOffDetails] = useState<IDayOffDetailResProps[]>(
    []
  );
  const [dutyDetails, setDutyDetails] = useState<IDutyDetailResProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredEmployees.slice(startIndex, endIndex);
  const [isManageShow, setIsManageShow] = useRecoilState(manageState);

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      const response = await reqManage();
      setEmployees(response.data || []);
    };
    {
      setTimeout(() => setIsLoading(false), 500);
    }
    fetchEmployees();
  }, []);

  const handleDayOffDetails = async (employeeId: number) => {
    const res = await detailDayOff(employeeId);
    const dayOffDetail = res.data || [];
    setIsManageShow(true);

    if (dayOffDetail.length > 0) {
      setDutyDetails([]);
      setDayOffDetails(dayOffDetail);
    }
  };

  const handleDutyDetails = async (employeeId: number) => {
    const res = await detailDuty(employeeId);
    const dutyDetail = res.data || [];
    setIsManageShow(true);

    if (dutyDetail.length > 0) {
      setDayOffDetails([]);
      setDutyDetails(dutyDetail);
    }
  };

  useEffect(() => {
    const filterEmployees = () => {
      let newFilteredEmployees = employees;

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

      if (searchValue !== '') {
        newFilteredEmployees = newFilteredEmployees.filter(employee =>
          employee.name.includes(searchValue.trim())
        );
      }

      setFilteredEmployees(newFilteredEmployees);
    };
    filterEmployees();
  }, [selectedDepartment, selectedPosition, searchValue, employees]);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const modalRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const handleOutside = (e: Event) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsManageShow(false);
        setDayOffDetails([]);
        setDutyDetails([]);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [modalRef, setIsManageShow]);

  return (
    <>
      {isManageShow && (
        <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-10 ">
          <div
            ref={modalRef}
            className="w-1/3 h-80 bg-white absolute top-0 left-0 bottom-0 right-0 m-auto ">
            <div className="h-1/5 flex border-2 ">
              <div className="w-[1.8rem] bg-primary"></div>
              <div className="text-xl flex items-center ml-4">일정관리</div>
            </div>
            <div className="h-4/5 flex  ">
              <div className="m-auto h-4/5 w-4/5 border-2 border-primary rounded-lg flex-wrap overflow-auto ">
                <div className="flex h-1/5 bg-primary w-full border-b-2 border-white sticky top-0 z-10">
                  <div className="w-1/5 flex items-center justify-center border-white border-r-2 text-white">
                    내용
                  </div>
                  <div className="w-3/5 flex items-center justify-center text-white">
                    기간
                  </div>
                  <div className="w-1/5 flex items-center justify-center text-white border-l-2">
                    상태
                  </div>
                </div>

                {dayOffDetails.map(dayOffData => (
                  <div
                    key={dayOffData.dayOffId}
                    className="flex h-1/5 w-full  border-b-2  ">
                    <div className="w-1/5 flex items-center justify-center border-r-2">
                      {dayOffData.dayOff}
                    </div>
                    <div className="w-3/5 flex items-center justify-center">
                      {`${dayOffData.startDate} ~ ${dayOffData.endDate}`}
                    </div>
                    <div className="w-1/5 flex items-center justify-center border-l-2">
                      {dayOffData.requestStatus}
                    </div>
                  </div>
                ))}
                {dutyDetails.map(dutyData => (
                  <div
                    key={dutyData.dutyId}
                    className="flex h-1/5 w-full  border-b-2  ">
                    <div className="w-1/5 flex items-center justify-center border-r-2">
                      {dutyData.type}
                    </div>
                    <div className="w-3/5 flex items-center justify-center">
                      {dutyData.date}
                    </div>
                    <div className="w-1/5 flex items-center justify-center border-l-2">
                      {dutyData.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentPageData.map(employee => (
            <div
              key={employee.employeeId}
              className="flex justify-between w-[1456px] border-solid border-b-[1px] h-[50px] items-center">
              <div className="w-[13.5rem] text-center">{employee.name}</div>
              <div className="w-[7rem] ml-4 text-center">
                {employee.department}
              </div>
              <div className="w-[7rem] ml-2 mr-4 pl-4 text-center">
                {employee.position}
              </div>
              <div className="text-center w-[10rem] pl-4">
                {employee.hireDate}
              </div>
              <div className="w-[10rem] flex pl-4 justify-center">
                <button
                  className="w-[10rem] text-center hover:underline text-secondaryGray"
                  onClick={() => handleDayOffDetails(employee.employeeId)}>
                  상세보기
                </button>
              </div>
              <div className="w-[10rem] justify-center pl-2 flex">
                <button
                  className="w-[10rem] text-center hover:underline text-secondaryGray"
                  onClick={() => handleDutyDetails(employee.employeeId)}>
                  상세보기
                </button>
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffTotal}일
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffUsed}일
              </div>
              <div className="w-[10rem] text-center">
                {employee.dayOffRemains}일
              </div>
            </div>
          ))}
        </>
      )}
      <div className="flex items-end justify-center mt-[2rem]  ">
        <Pagination
          pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
