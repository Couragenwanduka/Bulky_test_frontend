import axiosInstance from "..";


interface CartParams {
    productId: number;
    quantity: number;
}

export const addToCart = async (data: CartParams) => {
    const { data: response } = await axiosInstance.post(`/cart/add`, data);
    return response.data;
}