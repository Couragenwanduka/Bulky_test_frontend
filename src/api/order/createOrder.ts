import axiosInstance from "..";

interface OrderItem {
  productId: string;
  quantity: number;
}

interface CreateOrderParams {
  items: OrderItem[];
  status?: string; // e.g., "PENDING"
}

export const createOrder = async (data: CreateOrderParams) => {
  const { data: response } = await axiosInstance.post("/order", data);
  return response.data;
};
