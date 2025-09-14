import axiosInstance from "..";

export const removeCartItem = async (data: {cartItemId: string}) => {
    const { data: response } = await axiosInstance.delete(`/cart/remove`, { data });
    return response.data;
}