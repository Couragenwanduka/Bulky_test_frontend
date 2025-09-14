import useGetUserOrderHistory from '../hook/order/userGetOrder'

const Order = () => {
  const { data: orderHistory, isLoading, isError } = useGetUserOrderHistory()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load order history.</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orderHistory.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orderHistory.map((order: any) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              {/* Order summary */}
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      order.status === 'pending'
                        ? 'text-yellow-600'
                        : order.status === 'completed'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {order.status}
                  </p>
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order items */}
              <div className="space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b last:border-none pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.product?.name || 'Product'}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order
