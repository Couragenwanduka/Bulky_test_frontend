import { useMutation } from '@tanstack/react-query';
import { removeCartItem } from '../../api/cart/removeCartItem';

interface RemoveCartParams {
  cartItemId: string;
}

export const useRemoveCart = () => {
  return useMutation({
    mutationFn: (data: RemoveCartParams) => removeCartItem(data),
    onSuccess: (response) => {
      console.log('Cart item removed:', response);
    },
    onError: (error) => {
      console.error('Error removing cart item:', error);
    },
  });
};
