import { useProducts } from '../hook/product/getProductHook';
import { useState } from 'react';
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useAddToCart } from '../hook/cart/createCart';
import { toast } from 'sonner';
import { createWishlistItem } from '../api/wishlist/addWishlist';

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { search } = useSelector((state: RootState) => state.search);

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 10,
    search,
  });

  const addToCartMutation = useAddToCart();

  if (isLoading)
    return <p className="text-center mt-10">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load products.
      </p>
    );

  const handleAddToCart = () => {
    try {
      addToCartMutation.mutate({
        productId: selectedProduct?.id,
        quantity: 1,
      });
      setSelectedProduct(null);
      setSelectedImage(null);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await createWishlistItem({
        productId: selectedProduct?.id,
      });
      toast.success('Product added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  return (
    <div className="p-6">
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product: any) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedImage(product.imageUrl[0]);
            }}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden flex flex-col"
          >
            <img
              src={product.imageUrl[0]}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h2 className="text-md font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-blue-600 font-bold">${product.price}</span>
                <span className="text-gray-500 text-sm">
                  Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, data?.totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={page === data?.totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <img
                src={selectedImage || selectedProduct.imageUrl[0]}
                alt={selectedProduct.name}
                className="w-full h-80 object-contain rounded"
              />

              {/* Thumbnails */}
              <div className="flex justify-between gap-2">
                {selectedProduct.imageUrl.map((url: string) => (
                  <img
                    key={url}
                    src={url}
                    alt={selectedProduct.name}
                    onClick={() => setSelectedImage(url)}
                    className={`flex-1 h-16 object-fill rounded-md cursor-pointer border-2 ${
                      selectedImage === url
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  />
                ))}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 font-heading">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-700 mb-4 font-body">
                    {selectedProduct.description}
                  </p>
                </div>
                {isLoggedIn && (
                  <div className="flex items-center justify-between mt-4 gap-3">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                      onClick={handleAddToWishlist}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
