import { authInstance } from './axios'

export const applyAnnual = async (updatedData: any) => {
  const APPLYANNUALURL = '/vacation/add'
  const res = await authInstance.post(APPLYANNUALURL, updatedData)
  return res
}

export const applyDuty = async (updatedData: any) => {
  const DUTYURL = `/duty/add`
  const res = await authInstance.post(DUTYURL, updatedData)
  return res
}

export const allAnnualList = async (year: string) => {
    const ALLANNUALURL = `/vacation/all/list?year=${year}`
    const res = await authInstance.get(ALLANNUALURL)
    return res
}

export const allDutyList = async (year: string) => {
  const ALLDUTYURL = `/duty/all/list?year=${year}`
  const res = await authInstance.get(ALLDUTYURL)
  return res
}

export const MyAnnualList = async (year:string) => {
  const MYANNUALURL = `/vacation/myvacation?year=${year}`
  const res = await authInstance.get(MYANNUALURL)
  return res
}

export const MyDutyList = async (year:string) => {
  const MYDUTYURL = `/duty/myduty?year=${year}`
  const res = await authInstance.get(MYDUTYURL)
  return res
}

export const DeleteAnnualList = async (id:string) => {
  const MYANNUALURL = `/vacation/cancel?id=${id}`
  const res = await authInstance.delete(MYANNUALURL)
  return res
}

export const DeleteDutyList = async (id:string) => {
  const MYDUTYURL = `/duty/cancel?id=${id}`
  const res = await authInstance.delete(MYDUTYURL)
  return res
}


export const ExcelAnnualList = async (year:string) => {
  const EXCELANNUALYURL = `/vacation/all/excel/download?year=${year}`
  const res = await authInstance.get(EXCELANNUALYURL, {
    responseType : 'blob',
  })
  return res
}


export const ExcelDutyList = async (year:string) => {
  const EXCELDUTYURL = `/duty/all/excel/download?year=${year}`
  const res = await authInstance.get(EXCELDUTYURL, {
    responseType : 'blob',
  })
  return res
}

export const UserInfoList = async () => {
  const USERURL = `/info`
  const res = await authInstance.get(USERURL)
  return res
}







