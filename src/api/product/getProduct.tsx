import axios from 'axios';

const api = (import.meta as any).env.VITE_API_URL

interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getAllProducts = async (params: GetProductsParams = {}) => {
    console.log(`${api}/product`)
  const { data } = await axios.get(`${api}/product`, { params });
  console.log('Debug Log from Product',data)
  return data.data; 
};
