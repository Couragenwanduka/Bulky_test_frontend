import axios from 'axios';

const api = (import.meta as any).env.VITE_API_URL

interface signupParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const signup = async (data: signupParams) => {
    const { data: response } = await axios.post(`${api}/user`, data);
    return response.data;
};