"use client";

import { useId, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { loginSchema, signupSchema } from "@/app/utils/validationSchema";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { login, register, reset } from "@/app/api/services/authService";
import useCartPanelStore from "@/store/useCartPanelStore";
import { useAuthStore } from "@/store/useAuthStore";

import {
  BackArrowIcon,
  CloseEyeIcon,
  GoogleIcon,
  OpenEyeIcon,
} from "./AuthIcons";

const FieldError = ({ formik, name }) => {
  if (!formik.touched[name] || !formik.errors[name]) return null;
  return <div className="aq-login-field-error">{formik.errors[name]}</div>;
};

const PasswordField = ({ formik, name, label, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="aq-login-input-box">
      <label className="aq-form-label">
        {label} <span>*</span>
      </label>
      <div className={`aq-login-input p-relative${visible ? " is-visible" : ""}`}>
        <input
          className="aq_password aq-form-control"
          type={visible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={formik.values[name] || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="button"
          className="aq-login-input-eye password-show-toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <span className="open-eye">
            <OpenEyeIcon />
          </span>
          <span className="close-eye">
            <CloseEyeIcon />
          </span>
        </button>
      </div>
      <FieldError formik={formik} name={name} />
    </div>
  );
};

const handleGoogleSignIn = () => {
  signIn("google", {
    callbackUrl: `${window.location.origin}/account`,
  });
};

export const SocialContinue = () => (
  <>
    <div className="aq-login-mail text-center aq-auth-mb-20">
      <p>Or continue with</p>
    </div>
    <button
      type="button"
      className="aq-login-google-btn"
      onClick={handleGoogleSignIn}
    >
      <GoogleIcon />
      <span>Continue with Google</span>
    </button>
  </>
);

const applyAuthSuccess = ({
  data,
  router,
  handleSaveUserData,
  setIsLoginAuth,
  cardDetails,
  wishlistDetails,
  formik,
  onRegistered,
}) => {
  if (!data?.token) {
    toast.success("Account created please login");
    formik.resetForm();
    if (onRegistered) {
      onRegistered();
    }
    return;
  }

  localStorage.setItem("accessToken", data.token);
  handleSaveUserData(data?.customer || {});
  const redirectPath = sessionStorage.getItem("postLoginRedirect") || "/account";
  sessionStorage.removeItem("postLoginRedirect");
  router.replace(redirectPath);
  toast.success("Welcome back! Happy shopping!");
  wishlistDetails();
  cardDetails();
  setIsLoginAuth(true);
  formik.resetForm();
};

export const LoginPanel = ({ onCreateAccount, onForgot }) => {
  const router = useRouter();
  const rememberId = useId();
  const { handleSaveUserData, setIsLoginAuth } = useAuthStore();
  const { cardDetails, wishlistDetails } = useCartPanelStore();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const loginFormData = new FormData();
      loginFormData.append("email", values.email);
      loginFormData.append("password", values.password);

      loader(true);
      try {
        const { data } = await login(loginFormData);
        applyAuthSuccess({
          data,
          router,
          handleSaveUserData,
          setIsLoginAuth,
          cardDetails,
          wishlistDetails,
          formik,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
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
    },
  });

  return (
    <>
      <div className="aq-login-top text-center aq-auth-mb-30">
        <h3 className="aq-login-title">Sign in to Kavya Creation.</h3>
        <p>Please enter your details below to sign in.</p>
      </div>
      <form className="aq-login-option" onSubmit={formik.handleSubmit} noValidate>
        <div className="aq-login-input-wrapper">
          <div className="aq-login-input-box">
            <label className="aq-form-label">
              Your Email / Mobile <span>*</span>
            </label>
            <input
              className="aq-form-control"
              type="text"
              name="email"
              placeholder="email@address.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError formik={formik} name="email" />
          </div>
          <PasswordField
            formik={formik}
            name="password"
            label="Password"
            placeholder="6+ characters required"
          />
        </div>
        <div className="aq-login-suggetions d-sm-flex align-items-center justify-content-between aq-auth-mb-20">
          <div className="aq-login-remeber">
            <input className="aq-form-checkbox" id={rememberId} type="checkbox" />
            <label className="aq-form-checkbox-label" htmlFor={rememberId}>
              Remember me
            </label>
          </div>
          <div className="aq-login-forgot">
            <button type="button" onClick={onForgot}>
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="aq-login-bottom-wrap aq-auth-mb-30">
          <button type="submit" className="aq-login-btn w-100 aq-auth-mb-10">
            Login
          </button>
          <button
            type="button"
            className="aq-login-btn btn-transparent w-100"
            onClick={onCreateAccount}
          >
            Create Account
          </button>
        </div>
        <SocialContinue />
      </form>
    </>
  );
};

export const RegisterPanel = ({ onLogin, onRegistered }) => {
  const router = useRouter();
  const rememberId = useId();
  const { handleSaveUserData, setIsLoginAuth } = useAuthStore();
  const { cardDetails, wishlistDetails } = useCartPanelStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const signupFormData = new FormData();
      signupFormData.append("email", values.email);
      signupFormData.append("password", values.password);
      signupFormData.append("mobile", values.mobile);
      signupFormData.append("name", values.name);

      loader(true);
      try {
        const { data } = await register(signupFormData);
        applyAuthSuccess({
          data,
          router,
          handleSaveUserData,
          setIsLoginAuth,
          cardDetails,
          wishlistDetails,
          formik,
          onRegistered,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
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
    },
  });

  return (
    <>
      <div className="aq-login-top text-center aq-auth-mb-30">
        <h3 className="aq-login-title">Create Account</h3>
        <p>Please register below to create an account.</p>
      </div>
      <form className="aq-login-option" onSubmit={formik.handleSubmit} noValidate>
        <div className="aq-login-input-wrapper">
          <div className="aq-login-input-box">
            <label className="aq-form-label">
              Full Name <span>*</span>
            </label>
            <input
              className="aq-form-control"
              type="text"
              name="name"
              placeholder="your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError formik={formik} name="name" />
          </div>
          <div className="aq-login-input-box">
            <label className="aq-form-label">
              Your Email <span>*</span>
            </label>
            <input
              className="aq-form-control"
              type="email"
              name="email"
              placeholder="email@address.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError formik={formik} name="email" />
          </div>
          <div className="aq-login-input-box">
            <label className="aq-form-label">
              Phone Number <span>*</span>
            </label>
            <input
              className="aq-form-control"
              type="tel"
              name="mobile"
              placeholder="your phone number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FieldError formik={formik} name="mobile" />
          </div>
          <PasswordField
            formik={formik}
            name="password"
            label="Password"
            placeholder="6+ characters required"
          />
          <PasswordField
            formik={formik}
            name="confirmPassword"
            label="Password confirmation"
            placeholder="Password confirmation"
          />
        </div>
        <div className="aq-login-suggetions d-sm-flex align-items-center justify-content-between aq-auth-mb-20">
          <div className="aq-login-remeber">
            <input className="aq-form-checkbox" id={rememberId} type="checkbox" />
            <label className="aq-form-checkbox-label" htmlFor={rememberId}>
              Remember me
            </label>
          </div>
        </div>
        <div className="aq-login-bottom-wrap aq-auth-mb-30 text-center">
          <button type="submit" className="aq-login-btn w-100 aq-auth-mb-15">
            Create Account
          </button>
          <span className="aq-login-account">
            Already have an account?{" "}
            <button type="button" onClick={onLogin}>
              Login here
            </button>
          </span>
        </div>
        <SocialContinue />
      </form>
    </>
  );
};

export const ForgotPanel = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await reset({ email });
      toast.success(data?.message || "Recovery link sent");
      setSubmitted(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="aq-login-top text-center aq-auth-mb-30">
        <h3 className="aq-login-title">Forgot password</h3>
        <p>
          {submitted
            ? "If that email is associated with a Kavya Creation account, you will receive a message shortly."
            : "No worries, we’ll send you reset instructions."}
        </p>
      </div>
      <div className="aq-login-option">
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <div className="aq-login-input-wrapper">
              <div className="aq-login-input-box">
                <label className="aq-form-label">
                  Your Email <span>*</span>
                </label>
                <input
                  className="aq-form-control"
                  type="email"
                  required
                  placeholder="email@address.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="aq-login-bottom-wrap text-center aq-auth-mb-20">
              <button type="submit" className="aq-login-btn w-100 aq-auth-mb-10">
                Reset Password
              </button>
              <button type="button" className="aq-login-account color" onClick={onBack}>
                <span>
                  <BackArrowIcon />
                </span>{" "}
                Back to Log in
              </button>
            </div>
          </form>
        )}
        {submitted && (
          <div className="aq-login-bottom-wrap text-center aq-auth-mb-20">
            <button type="button" className="aq-login-btn w-100 aq-auth-mb-10" onClick={onBack}>
              Back to Log in
            </button>
          </div>
        )}
      </div>
    </>
  );
};
