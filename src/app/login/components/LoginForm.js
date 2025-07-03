"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { loginSchema, signupSchema } from "@/app/utils/validationSchema";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { login, register } from "@/app/api/services/authService";
import useCartPanelStore from "@/store/useCartPanelStore";
import { useAuthStore } from "@/store/useAuthStore";

const loginFields = [
  {
    name: "email",
    placeholder: "Enter email / Mobile Number",
    type: "text",
    label: "Email / Mobile Number",
  },
  {
    name: "password",
    placeholder: "Enter password",
    type: "password",
    label: "Password",
    toggleable: true,
  },
];

const signupFields = [
  {
    name: "name",
    placeholder: "Enter your full name",
    type: "text",
    label: "Full Name",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    label: "Email",
  },
  {
    name: "mobile",
    placeholder: "Enter phone number",
    type: "tel",
    label: "Phone Number",
  },
  {
    name: "password",
    placeholder: "Create a password",
    type: "password",
    label: "Password",
    toggleable: true,
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm your password",
    type: "password",
    label: "Confirm Password",
    toggleable: true,
  },
];

const LoginForm = ({ isLogin, setIsLogin }) => {
  const router = useRouter();
  const { setIsLoginTrue, handleSaveUserData } = useAuthStore();
  const { cardDetails, wishlistDetails } = useCartPanelStore();
  const fields = isLogin ? loginFields : signupFields;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
      confirmPassword: "",
    },
    validationSchema: isLogin ? loginSchema : signupSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleSubmitForm();
    },
  });

  const handleSubmitForm = async () => {
    const loginFormData = new FormData();
    loginFormData.append("email", formik.values.email);
    loginFormData.append("password", formik.values.password);

    const signupFormData = new FormData();
    signupFormData.append("email", formik.values.email);
    signupFormData.append("password", formik.values.password);
    signupFormData.append("mobile", formik.values.mobile);
    signupFormData.append("name", formik.values.name);

    loader(true);
    try {
      const { data } = isLogin
        ? await login(loginFormData)
        : await register(signupFormData);
      if (!data?.token) {
        setIsLogin(true);
        toast.success("Account created please login");
      } else {
        sessionStorage.setItem("accessToken", data?.token);
        handleSaveUserData(data?.customer);
        const redirectPath =
          sessionStorage.getItem("postLoginRedirect") || "/account";
        router.replace(redirectPath);
        toast.success("Welcome back! Happy shopping!");
        wishlistDetails();
        cardDetails();
        setIsLoginTrue();
      }
      formik.resetForm();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
      const errorData = error?.response?.data;
      if (Array.isArray(errorData?.error)) {
        const fieldErrors = {};
        errorData.error.forEach(({ field, message }) => {
          fieldErrors[field] = message;
        });
        formik.setErrors(fieldErrors);
      }
    } finally {
      loader(false);
    }
  };

  const handleIsLogin = () => {
    setIsLogin((prev) => !prev);
    formik.resetForm();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2 mt-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name] || ""}
            className="mt-1 w-full p-2 border rounded-md pr-10 dark-color"
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="text-red-500 text-sm">
              {formik.errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-[var(--primary-main)] text-white 
        font-medium rounded h-12 hover:bg-[var(--primary-dark)] mt-2"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <div className="text-center text-sm mt-2">
        {!isLogin ? "Already have an account?" : "New customer?"}{" "}
        <button
          type="button"
          onClick={handleIsLogin}
          className="text-[var(--primary-main)] hover:text-[var(--primary-dark)] font-medium"
        >
          {!isLogin ? "Login" : " Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
