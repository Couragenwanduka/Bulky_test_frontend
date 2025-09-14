import { useState } from "react";
import useGetCart from "../hook/cart/getCart";
import { useUpdateCart } from "../hook/cart/updateCart";
import { toast } from "sonner";
import { useRemoveCart } from "../hook/cart/removeCart";
import { useCreateOrder } from "../hook/order/useCreateOrder";

const Cart = () => {
  const { data: cartItems, isLoading, isError, refetch } = useGetCart();
  const updateCartMutation = useUpdateCart();
  const { mutate: removeCart } = useRemoveCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createOrderMutation, error} = useCreateOrder();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load cart.</div>;

  console.log(error)


  const handleConfirmOrder = () => {
    const orderItems = cartItems.map((item: any) => ({
      productId: item.productId,
      quantity: Number(item.quantity),
    }));

    createOrderMutation(
      { items: orderItems, status: "pending" },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          refetch(); // maybe clear cart after order
        },
      }
    );
  };

  // ✅ increase
  const handleIncrease = (item: { id: string; quantity: number }) => {
    updateCartMutation.mutate(
      { cartItemId: item.id, quantity: Number(item.quantity) + 1 },
      { onSuccess: () => { toast.success("Quantity increased"); refetch(); } }
    );
  };

  // ✅ decrease
  const handleDecrease = (item: { id: string; quantity: number; productId: string }) => {
    if (item.quantity > 1) {
      updateCartMutation.mutate(
        { cartItemId: item.id, quantity: Number(item.quantity) - 1 },
        { onSuccess: () => { toast.success("Quantity decreased"); refetch(); } }
      );
    } else {
      handleRemove(item); // remove completely if only 1 left
    }
  };

  // ✅ remove
  const handleRemove = (item: { id: string }) => {
    removeCart({ cartItemId: item.id });
    refetch();
  };


  const total = cartItems.reduce(
    (sum: number, item: any) =>
      sum + Number(item.product.price) * Number(item.quantity),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageUrl[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrease(item)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ➖
                </button>
                <span className="font-bold">{Number(item.quantity)}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ➕
                </button>
                <button
                  onClick={() => handleRemove(item)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Create Order Button */}
          <div className="flex items-center justify-between mt-6">
            <div className="font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
            <p className="mb-4">
              You are about to place an order with{" "}
              <span className="font-semibold">{cartItems.length}</span> items.
            </p>
            <p className="mb-6 font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
