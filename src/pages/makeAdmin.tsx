import { useEffect, useState } from "react";
import axiosInstance from "../api";
import { toast } from "sonner";

const MakeAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get("/user/user"); // adjust to your API route
        console.log("Fetched users:", data);
        setUsers(data.data.users);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Handle make admin
  const handleMakeAdmin = async (userId: string) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/user/makeAdmin/${userId}`);
      toast.success("User promoted to admin!");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: "admin" } : u
        )
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
         <tbody>
            {users
                .filter((user) => user.role !== "ADMIN") // hide admins completely
                .map((user) => (
                <tr key={user.id} className="text-center">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border capitalize">{user.role}</td>
                    <td className="p-3 border">
                    <button
                        onClick={() => handleMakeAdmin(user.id)}
                        disabled={loading}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Make Admin"}
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>

        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
