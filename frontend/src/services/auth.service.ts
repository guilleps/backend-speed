import apiClient from "@/api/axios";

export const loginAuth = async ({ email, password }: { email: string, password: string }) => {
  const res = await apiClient.post('/auth/login', { email, password });
  console.log('login', res.data);
  return res.data;
};