import axiosInstance from "..";

const getUserOrderHistory = async () => {
    const { data: response } = await axiosInstance.get(`/order`);
    return response.data;
}

export default getUserOrderHistory;