import axios from 'axios';

export const authenticate2FA = async (formData2FA) => {
  try{
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/authenticate/`
    console.info(addr)
    const response = await axios.post(addr,formData2FA);
    return response.data;
  }catch(error)
  {
    throw new Error(error.response.data.error);
  }
}

export const registerUser = async (formDataRegister) => {
  try {
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/register/`
    console.info(addr)
    const response = await axios.post(addr,formDataRegister);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const loginUser = async (formDataLogin) => {
  try {
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/login/`
    console.info(addr)
    const response = await axios.post(addr,formDataLogin);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true
})
export default api;