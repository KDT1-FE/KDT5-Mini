import axios from 'axios'
import { ILogin } from '@type/api'

// API 공통 영역 변수
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 로그인
const login = async ({ email, password }: ILogin) => {
  const res = await api({
    method: 'POST',
    url: '/login',
    data: { email, password }
  })
  return res.data
}
// 로그아웃
const logout = async () => {
  const res = await api({
    method: 'GET',
    url: '/logout'
  })
  return res.data
}

// 모든 연차 조회
const getAnnual = async (page: number) => {
  const res = await api.get(`/annual?page=${page}`)
  return res.data
}
// 연차 수정
const editAnnual = async (status: string, annualId: number) => {
  const res = await api({
    method: 'PUT',
    url: `/annual/${annualId}`,
    data: { status }
  })
  return res.data
}
// 연차 삭제
const deleteAnnual = async (annualId: string) => {
  const res = await api.delete(`/annual/${annualId}`)
}
// 모든 당직 조회
const getDuty = async (page) => {
  const res = await api.get(`/duty?page=${page}`)
  return res.data
}
// 당직 수정
const editDuty = async (status: string, dutyId: number) => {
  const res = await api({
    method: 'PUT',
    url: `/duty/${dutyId}`,
    data: { status }
  })
  return res.data
}
// 당직 삭제
const deleteDuty = async (dutyId: string) => {
  const res = await api.delete(`/duty/${dutyId}`)
  return res.data
}
// 모든 회원 조회
const getUser = async (page: number) => {
  const res = await api.get(`/user?page=${page}`)
  return res.data
}
// 회원 직급 조정
const editEmployee = async (userId: string, position: string) => {
  const res = await api({
    method: 'PATCH',
    url: `/position/${userId}`,
    data: { position }
  })
  return res.data
}
// 회원 연차횟수 조정
const editAnnualCount = async (userId: string, count: number) => {
  const res = await api({
    method: 'GET',
    url: `/annual/${userId}?size=${count}`
  })
  return res.data
}
// 회원 검색
const searchUser = async (query: string, page: number) => {
  const res = await api({
    method: 'GET',
    url: `/search?query=${query}&page=${page}`
  })
  return res.data
}

export {
  login,
  logout,
  getAnnual,
  getDuty,
  getUser,
  editAnnual,
  deleteAnnual,
  editDuty,
  deleteDuty,
  editEmployee,
  editAnnualCount,
  searchUser
}
