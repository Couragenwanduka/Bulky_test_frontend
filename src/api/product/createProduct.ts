import axiosInstance from "..";

export const createProduct = async (data: { name: string; description: string; price: number; stock:number; imageUrl:string[] }) => {
    const { data: response } = await axiosInstance.post(`/product`, data);
    return response.data;
}

