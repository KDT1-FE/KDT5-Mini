import baseApi from '@/api'
import {
  annualUserData,
  annualCancelData,
  workUserData,
  updatePasswordReq,
  updatePasswordData
} from '@/types/MypageTypes'

// 개인 연차 조회
export const getUserAnnualApi = async (token: string, year: number) => {
  try {
    const res = await baseApi.get(`/user/annual?year=${year}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      const data: annualUserData = res.data.data
      return data
    }
  } catch (error) {
    console.error('개인 연차 조회 api 오류', error)
  }
}

// 개인 당직 조회
export const getUserWorkApi = async (token: string, year: number, month: number) => {
  try {
    const res = await baseApi.get(`/user/work?year=${year}&month=${month}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data: workUserData = res.data.data
    if (res.status === 200) return data
  } catch (error) {
    console.error('개인 당직 조회 api 오류', error)
  }
}

// 개인 연차 취소 / 취소 신청
export const cancelAnnualApi = async (token: string, annualId: number) => {
  try {
    const res = await baseApi.post(
      `/user/annual/${annualId}`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data: annualCancelData = res.data.data
    if (res.status === 200) return data
  } catch (error) {
    console.error('개인 연차 취소 / 취소 신청 api 오류', error)
  }
}

// 비밀번호 수정
export const updatePasswordApi = async (token: string, requestBody: updatePasswordReq) => {
  try {
    const res = await baseApi.put(`/user`, requestBody, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data: updatePasswordData = res.data.data
    if (res.status === 200) return data
  } catch (error) {
    console.error('비밀번호 수정 api 오류', error)
  }
}
