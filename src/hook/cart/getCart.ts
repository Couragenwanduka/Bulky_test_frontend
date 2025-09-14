import { useQuery } from "@tanstack/react-query";
import getUsersCart from "../../api/cart/getCart";

const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getUsersCart,
    staleTime: 1000 * 60,
  });
};

export default useGetCart;
