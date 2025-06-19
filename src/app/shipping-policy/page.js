import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { SHIPPING_POLICY_MODEL } from "../utils/constants";

const ShippingPolicy = () => {
  return (
    <>
      <CustomBreadCrumb
        model={SHIPPING_POLICY_MODEL}
        title={"Shipping Policy"}
      />
      {/* Content  */}
    </>
  );
};

export default ShippingPolicy;
