import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
  address1: Yup.string(),
  city: Yup.string().required("City is required"),
  state_id: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "PIN code must be 6 digits")
    .required("PIN code is required"),
});
