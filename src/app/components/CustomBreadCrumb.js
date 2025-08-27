"use client";

import { BreadCrumb } from "primereact/breadcrumb";
import { useRouter } from "next/navigation";
import { BREAD_CRUMB_HOME } from "../utils/constants";

const CustomBreadCrumb = ({ model = [], title }) => {
  const router = useRouter();

  const processedModel = model.map((item) => {
    if (item.useBack) {
      return {
        ...item,
        command: () => router.back(),
      };
    }
    return item;
  });

  return (
    <div>
      <BreadCrumb
        model={processedModel}
        home={BREAD_CRUMB_HOME}
        className="custom-breadcrumb"
      />
      {title && <h2 className="dark-color flex justify-center">{title}</h2>}
    </div>
  );
};

export default CustomBreadCrumb;
