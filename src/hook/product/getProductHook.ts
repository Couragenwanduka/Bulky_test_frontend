import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllProducts } from '../../api/product/getProduct';

interface UseProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', options],   // <-- query key
    queryFn: () => getAllProducts(options), // <-- fetch function
    placeholderData: keepPreviousData, // keeps previous data when changing filters
    staleTime: 1000 * 60,              // cache for 1 minute
  });
};