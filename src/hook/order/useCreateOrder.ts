
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../api/order/createOrder";
import { toast } from "sonner";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
};
