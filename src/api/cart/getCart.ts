import axiosInstance from "..";


const getUsersCart = async () => {
    const { data: response } = await axiosInstance.get(`/cart`);
    return response.data;
}

export default getUsersCart;