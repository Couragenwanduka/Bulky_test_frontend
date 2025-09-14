import { useEffect, useState } from "react";
import axiosInstance from "../api";
import { toast } from "sonner";

const WishList = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/wishlist");
      console.log("Fetched wishlist:", data);
      setWishlist(data.data || []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove from wishlist
  const handleRemove = async (wishlistItemId: string) => {
    try {
      await axiosInstance.delete(`/wishlist/${wishlistItemId}`);
      toast.success("Item removed from wishlist!");
      // Update local state so UI refreshes
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to remove item");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading wishlist...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={item.product.imageUrl[0]}
                alt={item.product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{item.product.name}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold">
                    ${item.product.price}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)} // ✅ Use wishlist item id
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
