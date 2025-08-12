export const BREAD_CRUMB_HOME = { label: "Home", url: "/" };

export const SHOP_MODEL = [{ label: "Shop" }];
export const ABOUT_MODEL = [{ label: "About Us" }];
export const CONTACT_MODEL = [{ label: "Contact Us" }];
export const WISHLIST_MODEL = [{ label: "Wishlist" }];
export const CART_MODEL = [{ label: "Shopping Cart" }];
export const TERMS_AND_CONDITIONS_MODEL = [{ label: "Terms and Conditions" }];
export const PRIVACY_POLICY_MODEL = [{ label: "Privacy Policy" }];
export const REPLACEMENT_POLICY_MODEL = [{ label: "Replacement Policy" }];
export const SHIPPING_POLICY_MODEL = [{ label: "Shipping Policy" }];

export const LOGIN_ERROR_MSG =
  "Please log in to add items to your Wishlist or Cart.";

export const LOGIN_MSG = "Please login to see details.";
export const LOGGED_OUT_MSG = "Logged out successfully.";
export const COD_SUCCESS_MSG = "Order placed successfully (Cash on Delivery)";
export const SELECT_ADDRESS_ERROR_MSG = "Please Select or Add Address";
export const PAYMENT_METHOD = "Please Select payment method";

// toastConfig
export const TOAST_OPTIONS = {
  success: {
    style: {
      background: "#ecfdf5",
      color: "#065f46",
      border: "1px solid #a7f3d0",
    },
    iconTheme: {
      primary: "#34d399",
      secondary: "#ecfdf5",
    },
  },
  error: {
    duration: 2000,
    style: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
    },
    iconTheme: {
      primary: "#f87171",
      secondary: "#fef2f2",
    },
  },
  duration: 2000,
};
