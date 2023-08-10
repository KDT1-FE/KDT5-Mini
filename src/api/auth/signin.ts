import { customAxios } from '@/api/customAxios';

export const signin = async (loginData: {
  userEmail: string;
  userPassword: string;
}) => {
  // 로컬
  const response = await customAxios.post('/v2/auth/signin', loginData, {
    // 배포
    // const response = await customAxios.post('/v1/auth/signin', loginData, {
    withCredentials: true,
  });
  return response;
};
