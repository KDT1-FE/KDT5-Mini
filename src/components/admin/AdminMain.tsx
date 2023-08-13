import { RecoilRoot } from 'recoil';
import { Cookies } from 'react-cookie';
import React, { useEffect, useState } from 'react';
import DialogModal from '@/components/common/Dialog';
import { IMainProps } from '@/types/IAdmin';
import MainHeader from '@/components/admin//AdminMainHeader';
import SideBar from '@/components/admin//AdminSideBar';
import DropdownFilter from '@/components/admin/AdminDropDownFilter';
import RequestList from '@/components/admin/AdminRequestList';
import EmployeeList from '@/components/admin/AdminManageList';
import CustomPicker from '@/components/common/CustomPicker';
import AdminModify from '@/components/admin/AdminModify';

import {
  EMPLOYEE_POSITION,
  DEPARTMENT,
  STATUS,
  REST_REQUEST
} from '@/constants/options';

export default function Main({ page }: IMainProps) {
  // 쿠키에 저장된 employeeId를 꺼내와서 employeeId 변수에 저장
  const cookie = new Cookies();
  const isAdmin = cookie.get('role');

  const [renderModal, setRenderModal] = useState(true); // Diaglog Modal 렌더링 조건
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>('계열사');
  const [selectedPosition, setSelectedPosition] = useState<string>('직급');
  const [selectedStatus, setSelectedStatus] = useState<string>('상태');
  const [selectedRest, setSelectedRest] = useState<string>('요청');

  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    if (isAdmin === 'ADMIN') setRenderModal(false);
  }, [isAdmin]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleRestChange = (value: string) => {
    setSelectedRest(value);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handlePositionChange = (value: string) => {
    setSelectedPosition(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevIsSidebarOpen => !prevIsSidebarOpen);
  };

  return (
    <RecoilRoot>
      {renderModal && <DialogModal message={'관리자 로그인이 필요합니다.'} />}

      <div className="w-[96rem] h-[52.25rem] bg-white mx-auto my-auto rounded-2xl ">
        <MainHeader onToggleSidebar={handleToggleSidebar} />
        <div className=" flex">
          {isSidebarOpen && <SideBar />}
          <div className="">
            <div className="w-[12rem] h-[2rem]  font-400 mb-[4rem] text-3xl flex ml-[3.5rem] mt-[2rem] font-semibold ">
              {page === 'admin-manage' && '관리'}
              {page === 'admin-leave' && '연차요청관리'}
              {page === 'admin-duty' && '당직요청관리'}
              {page === 'admin-modify' && '사원정보수정'}
            </div>

            {(page === 'admin-duty' || page === 'admin-leave') && (
              <div className="mb-[2rem] ml-[3rem] font-semibold text-4xl">
                <CustomPicker />
              </div>
            )}

            <div className={`${isSidebarOpen ? '' : 'ml-[3rem]'}`}>
              <div className="shadow w-[1456px]">
                {page !== 'admin-modify' && (
                  <div
                    className={`flex border-solid border-b-2 justify-between h-[3rem]  items-center text-lg font-medium `}>
                    {(page === 'admin-duty' || page === 'admin-leave') && (
                      <>
                        {page === 'admin-duty' && (
                          <div className="flex justify-center ml-4 w-[7rem] pr-4">
                            요청
                          </div>
                        )}

                        {page === 'admin-leave' && (
                          <div className="flex justify-center ml-6 w-[7rem]">
                            <DropdownFilter
                              options={REST_REQUEST}
                              value={selectedRest}
                              onChange={handleRestChange}
                            />
                          </div>
                        )}

                        <div className="w-[12rem] flex justify-center ">
                          이름:
                          <input
                            className="w-[5rem] ml-2 border-solid border-2 border-gray-400 rounded-md text-center h-[1.8rem] "
                            type="text"
                            placeholder="사원검색"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                        </div>
                        <div className="flex justify-center pl-6 w-[10rem]">
                          <DropdownFilter
                            options={DEPARTMENT}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                          />
                        </div>
                        <div className="flex justify-center ml-2 w-[6rem]">
                          <DropdownFilter
                            options={EMPLOYEE_POSITION}
                            value={selectedPosition}
                            onChange={handlePositionChange}
                          />
                        </div>
                        <div className="text-center pr-2 w-[13rem] pl-4">
                          입사일
                        </div>
                        <div className="w-[19rem] pr-14 text-center">
                          요청내역
                        </div>
                        <div className="flex justify-center w-[6rem]">
                          <DropdownFilter
                            options={STATUS}
                            value={selectedStatus}
                            onChange={handleStatusChange}
                          />
                        </div>
                        <div className="w-[13rem]  text-center ">관리</div>
                      </>
                    )}

                    {page === 'admin-manage' && (
                      <>
                        <div className="w-[9rem] ml-[3rem] mr-4 text-center">
                          이름:
                          <input
                            className="w-[5rem] ml-2 border-solid border-2 border-gray-400 rounded-md text-center h-[1.8rem] "
                            type="text"
                            placeholder="사원검색"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                        </div>
                        <div className="flex justify-center w-[8rem] pl-14">
                          <DropdownFilter
                            options={DEPARTMENT}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                          />
                        </div>
                        <div className="flex justify-center w-[8rem]">
                          <DropdownFilter
                            options={EMPLOYEE_POSITION}
                            value={selectedPosition}
                            onChange={handlePositionChange}
                          />
                        </div>
                        <div className="flex">
                          {[
                            '입사일',
                            '연차내역',
                            '당직내역',
                            '총연차',
                            '사용연차',
                            '잔여연차'
                          ].map((label, index) => (
                            <div key={index} className="w-[10rem] text-center">
                              {label}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <>{page === 'admin-modify' && <AdminModify />}</>

              <div>
                {page === 'admin-duty' && (
                  <RequestList
                    page={page}
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    selectedStatus={selectedStatus}
                    searchValue={searchValue}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
              <div>
                {page === 'admin-leave' && (
                  <RequestList
                    page={page}
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    selectedRest={selectedRest}
                    selectedStatus={selectedStatus}
                    searchValue={searchValue}
                    currentPage={currentPage}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
              <div>
                {page === 'admin-manage' && (
                  <EmployeeList
                    isSidebarOpen={isSidebarOpen}
                    selectedDepartment={selectedDepartment}
                    selectedPosition={selectedPosition}
                    searchValue={searchValue}
                    currentPage={currentPage}
                    pageCount={Math.ceil(
                      filteredEmployees.length / itemsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
