import axios from 'axios';

const api = (import.meta as any).env.VITE_API_URL


const updateUser = async (userId: string, data: any) => {
    const { data: response } = await axios.put(`${api}/user/user/${userId}`, data);
    return response.data;
}

export default updateUser;