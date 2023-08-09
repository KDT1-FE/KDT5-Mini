import { ChangeEvent, useRef, SetStateAction } from 'react'
import style from './AdminFilters.module.scss'

interface AdminFiltersProps {
  search: string
  setSearch: (value: SetStateAction<string>) => void
  delayedSearch: string
  setDelayedSearch: (value: SetStateAction<string>) => void
  sort: 'asc' | 'desc'
  setSort: (value: SetStateAction<'asc' | 'desc'>) => void
  selectedColumn: 'name' | 'restAnnual' | 'workDay' | 'date'
  setSelectedColumn?: (value: SetStateAction<'name' | 'restAnnual' | 'workDay' | 'date'>) => void
  setSelectedColumn1?: (value: SetStateAction<'name' | 'restAnnual' | 'workDay'>) => void
  setSelectedColumn2?: (value: SetStateAction<'name' | 'date'>) => void
  columns: Array<{ value: 'name' | 'restAnnual' | 'workDay' | 'date'; text: string }>
  name?: string
}

const AdminFilters = ({
  search,
  setSearch,
  setDelayedSearch,
  sort,
  setSort,
  setSelectedColumn1,
  setSelectedColumn2,
  columns,
  name
}: AdminFiltersProps) => {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)
  // 이름 입력시 약간 지연시켜서 검색 결과 출력
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(() => {
      setDelayedSearch(e.target.value)
    }, 150)
  }

  // 정렬 함수
  const handleColumnChange1 = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn1?.(e.target.value as SetStateAction<'name' | 'restAnnual' | 'workDay'>)
  }

  const handleColumnChange2 = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn2?.(e.target.value as SetStateAction<'name' | 'date'>)
  }
  // 선택한 정렬 값을 setSort 함수를 사용하여 업데이트
  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value as 'asc' | 'desc')
  }

  return (
    <>
      {/* 검색 창, 정렬 셀렉트 박스 및 라디오 버튼들 */}
      <input
        type="text"
        className={style.searchInput}
        placeholder="사원 검색"
        value={search}
        onChange={handleSearchChange}
      />
      <select 
        className={style.searchInput} 
        onChange={setSelectedColumn1 ? handleColumnChange1 : handleColumnChange2}>
        {columns.map((col, index) => (
          <option key={index} value={col.value}>
            {col.text}
          </option>
        ))}
      </select>
      <label>
        <input 
          type="radio" 
          name={name} 
          value="asc" 
          checked={sort === 'asc'} 
          onChange={handleSortChange} />
        오름차순
      </label>
      <label>
        <input 
          type="radio" 
          name={name} 
          value="desc" 
          checked={sort === 'desc'} 
          onChange={handleSortChange} />
        내림차순
      </label>
    </>
  )
}

export default AdminFilters
