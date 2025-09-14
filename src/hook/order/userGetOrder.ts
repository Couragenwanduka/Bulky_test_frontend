import { useQuery } from '@tanstack/react-query';
import getUserOrderHistory from '../../api/order/getOrder';

const useGetUserOrderHistory = () => {
  return useQuery({
    queryKey: ['orderHistory'],
    queryFn: getUserOrderHistory,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};

export default useGetUserOrderHistory;
