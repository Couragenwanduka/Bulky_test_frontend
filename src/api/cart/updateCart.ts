import axiosInstance from "..";

export const updateCartItem = async (data: {cartItemId:string, quantity:number}) => {
    const { data: response } = await axiosInstance.put(`/cart/update`, data);
    return response.data;
}