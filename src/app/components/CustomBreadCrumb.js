import { BreadCrumb } from "primereact/breadcrumb";
import { BREAD_CRUMB_HOME } from "../utils/constants";

const CustomBreadCrumb = ({ model, title }) => {
  return (
    <div>
      <BreadCrumb
        model={model}
        home={BREAD_CRUMB_HOME}
        className="custom-breadcrumb"
      />
      {title && <h2 className="dark-color flex justify-center">{title}</h2>}
    </div>
  );
};

export default CustomBreadCrumb;
