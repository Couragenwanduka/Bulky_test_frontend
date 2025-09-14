import axios from 'axios';

const api = (import.meta as any).env.VITE_API_URL

interface loginParams {
    email: string;
    password: string;
}

export const login = async (data: loginParams) => {
    const { data: response } = await axios.post(`${api}/user/login`, data);
    return response.data;
};