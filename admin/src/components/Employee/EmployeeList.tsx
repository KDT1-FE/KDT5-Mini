import { useEmployeeStore } from 'zustandState/store'
import Item from './Item'

const EmployeeList = () => {
  const { searchdata } = useEmployeeStore()

  return (
    <>
      {searchdata?.members?.map((el, v) => (
        <Item data={el} index={v} key={v} />
      ))}
    </>
  )
}

export default EmployeeList
