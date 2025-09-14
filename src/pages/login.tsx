import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "../hook/auth/loginHook";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authslice"
import { useDispatch } from "react-redux";

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { mutate: loginMutation, isPending } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values: { email: string; password: string }) => {
    toast.success("Logging in...");
    loginMutation(values, {
      onSuccess: (data) => {
        toast.success("Login successful!");
        console.log("User data:", data);
        navigate("/");
        dispatch(loginSuccess(data));
      },
      onError: (error: any) => {
        toast.error(error?.message || "Login failed");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-background)]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center font-heading text-textPrimary">
          Login
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="email">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={ isPending}
                className="mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
