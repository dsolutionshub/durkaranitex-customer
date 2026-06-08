"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";

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
  const { handleSaveUserData, setIsLoginAuth } = useAuthStore();
  const { cardDetails, wishlistDetails } = useCartPanelStore();
  const fields = isLogin ? loginFields : signupFields;
  const [visibility, setVisibility] = useState({});

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
        localStorage.setItem("accessToken", data?.token);
        handleSaveUserData(data?.customer || {});
        const redirectPath =
          sessionStorage.getItem("postLoginRedirect") || "/account";
        router.replace(redirectPath);
        toast.success("Welcome back! Happy shopping!");
        wishlistDetails();
        cardDetails();
        setIsLoginAuth(true);
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

  const toggleVisibility = (fieldName) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const getInputType = (field) => {
    const isPasswordField =
      field.type === "password" ||
      field.name.toLowerCase().includes("password");

    return isPasswordField && visibility[field.name] ? "text" : field.type;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2 mt-4">
      {fields.map((field) => {
        const isPasswordField =
          field.type === "password" ||
          field.name.toLowerCase().includes("password");

        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <div className="relative">
              <input
                name={field.name}
                type={getInputType(field)}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name] || ""}
                className="mt-1 w-full p-2 border rounded-md pr-10 dark-color"
              />

              {isPasswordField && (
                <span
                  onClick={() => toggleVisibility(field.name)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                >
                  {visibility[field.name] ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              )}
            </div>

            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="text-red-500 text-sm">
                {formik.errors[field.name]}
              </div>
            )}
          </div>
        );
      })}

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

      {isLogin && (
        <>
          <div className="flex items-center my-3">
            <span className="flex-grow border-t border-gray-200" />
            <span className="mx-3 text-sm text-gray-500">or</span>
            <span className="flex-grow border-t border-gray-200" />
          </div>

          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: `${window.location.origin}/account`,
              })
            }
            className="w-full bg-white text-black border border-gray-300 rounded h-12 flex items-center justify-center gap-2 hover:bg-gray-100"
            aria-label="Continue with Google"
          >
            <AiOutlineGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </>
      )}
    </form>
  );
};

export default LoginForm;
