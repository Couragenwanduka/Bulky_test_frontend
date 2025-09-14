import { useMutation } from '@tanstack/react-query';
import { addToCart } from '../../api/cart/createCart';


interface CartParams {
    productId: number;
    quantity: number;
}
export const useAddToCart = () => {
    return useMutation({
        mutationFn: addToCart,
        onSuccess: (response:CartParams) => {
            console.log('Cart item added:', response);
        },
        onError: (error) => {
            console.error('Error adding cart item:', error);
        },
    });
};