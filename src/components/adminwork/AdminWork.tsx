import { useState } from 'react'
import { DateClickInfo } from '@/types/MainTypes'
import { IoIosClose } from 'react-icons/io'
import style from './AdminWork.module.scss'
import { userListData, workRegistReq } from '@/types/AdminTypes'
import { registWorkApi } from '@/api/admin'
import { getAnnualApi } from '@/api/main'
import { getCookie } from '@/utils/cookie'

interface Props {
  dateInfo: DateClickInfo
  employees: userListData
  setShowAdminWork: (showAdminWork: boolean) => void
  onWorkAssigned: () => void
}

const AdminWork = ({ dateInfo, employees, setShowAdminWork, onWorkAssigned }: Props) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([''])
  const modalHeight = 400 + Math.max(0, selectedEmployees.length - 5) * 25

  // 선택한 직원을 관리하는 이벤트 핸들러
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newSelectedEmployees = [...selectedEmployees]
    newSelectedEmployees[index] = e.target.value

    // 마지막 드롭다운에서 선택된 경우 새로운 드롭다운을 추가
    if (index === selectedEmployees.length - 1 && e.target.value) {
      newSelectedEmployees.push('')
    }

    setSelectedEmployees(newSelectedEmployees)
  }

  const assignHandler = async () => {
    const annualData = await getAnnualApi(
      parseInt(dateInfo.dateStr.slice(0, 4)),
      parseInt(dateInfo.dateStr.slice(5, 7))
    )

    for (const employee of selectedEmployees) {
      if (!employee) continue

      const foundEmployee = employees.find((e) => `${e.name}${e.employeeNumber.slice(0, 5)}` === employee)

      if (foundEmployee && annualData) {
        const employeeOnLeave = annualData.find(
          (leave) =>
            leave.name === foundEmployee.name &&
            leave.employeeNumber.slice(0, 5) === foundEmployee.employeeNumber.slice(0, 5) &&
            leave.date === dateInfo.dateStr &&
            leave.status === 'APPROVED'
        )

        if (employeeOnLeave) {
          alert(`${foundEmployee.name} 사원의 휴가일 입니다.`)
          const newSelectedEmployees = [...selectedEmployees]
          newSelectedEmployees[selectedEmployees.indexOf(employee)] = ''
          setSelectedEmployees(newSelectedEmployees)
          continue
        }
      }

      if (foundEmployee) {
        const data: workRegistReq = {
          id: foundEmployee.id,
          date: dateInfo.dateStr
        }

        const token = getCookie('token')
        await registWorkApi(token, data)
      }
    }

    setSelectedEmployees([''])
    setShowAdminWork(false)
    onWorkAssigned && onWorkAssigned()
  }

  const modalCloseHandler = () => setShowAdminWork(false)

  return (
    <>
      <div className={style.container} style={{ height: modalHeight }}>
        <div className={style.modalHeader}>
          <span className={style.title}>{dateInfo.dateStr}</span>
          <div className={style.icon} onClick={modalCloseHandler}>
            <IoIosClose />
          </div>
        </div>

        <div className={style.assignContent}>
          <span className={style.title}>당직 지정하기</span>
          {/* 드롭다운 추가 */}
          <div className={style.dropdownContainer}>
            {selectedEmployees.map((selectedEmployees, i) => (
              <select
                key={i}
                className={style.employeeSelect}
                value={selectedEmployees}
                onChange={(e) => handleEmployeeChange(e, i)}
              >
                {/* 드롭다운 사원 리스트 */}
                <option>-- 사원 선택 --</option>
                {Array.isArray(employees) &&
                  employees
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((employee, index) => (
                      <option key={index} value={`${employee.name}${employee.employeeNumber.slice(0, 5)}`}>
                        {`${employee.name} (${employee.employeeNumber.slice(0, 5)})`}
                      </option>
                    ))}
              </select>
            ))}
          </div>
          {/* 메세지 리스트 */}
          <div className={style.assignWrapper}>
            <div className={style.selectedEmployeesList}>
              {selectedEmployees.map(
                (employee, index) => employee && <div key={index}>{employee} 님을 당직으로 지정하시겠습니까?</div>
              )}
            </div>

            <button className={style.assignBtn} onClick={assignHandler} disabled={!selectedEmployees}>
              지정하기
            </button>
          </div>
        </div>
      </div>
      <div className={style.background} onClick={modalCloseHandler}></div>
    </>
  )
}

export default AdminWork
