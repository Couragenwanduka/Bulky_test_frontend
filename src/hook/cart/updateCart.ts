import { useMutation } from '@tanstack/react-query';
import { updateCartItem } from '../../api/cart/updateCart';

interface UpdateCartParams {
  cartItemId: string;
  quantity: number;
}

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: (data: UpdateCartParams) => updateCartItem(data),
    onSuccess: (response) => {
      console.log('Cart item updated:', response);
    },
    onError: (error) => {
      console.error('Error updating cart item:', error);
    },
  });
};
