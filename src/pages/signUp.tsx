import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authslice"
import { useDispatch } from "react-redux";
import { useSignup } from "../hook/auth/signUpHook";

// Validation schema
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: signUpMutation, isPending } = useSignup();


  const handleSubmit = (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log("SignUp values (with confirmPassword):", values);

  // Remove confirmPassword before sending request
  const { confirmPassword, ...payload } = values;

  toast.success("Signing up...");
  signUpMutation(payload, {
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
        <h1 className="text-2xl font-bold mb-4 text-center font-heading text-[var(--color-textPrimary)]">
          Sign Up
        </h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
             <div className="flex gap-3">
                  <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="firstName">
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
             </div>

              <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="email">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
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
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-body mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none "
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="mt-4 bg-[var(--color-primary)] text-white py-2 rounded hover:bg-[var(--color-primary)]/90 transition-colors"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
