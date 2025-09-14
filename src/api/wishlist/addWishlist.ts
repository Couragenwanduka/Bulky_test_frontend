import axiosInstance from "..";

export const createWishlistItem = async (data: {productId: number}) => {
    const { data: response } = await axiosInstance.post(`/wishlist/add`, data);
    return response.data;
}