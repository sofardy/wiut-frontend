import React from "react";
import NoneLayout from "../layouts/noneLayout";
import ClientLayout from "../layouts/clientLayout";
import AdminLayout from "../layouts/adminLayout";
import NotFound from "../components/notFound";
import { public_routes } from "./index.js";
import { Route, Routes } from "react-router-dom";

const RoutesMiddleware = () => {

  const createComponent = (name) => {
    const NewComponent = name;
    return <NewComponent />;
  };

  return (
    <Routes>
      {public_routes.length &&
        public_routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item?.path}
              exact={item.exact}
              element={
                item.config.structure == "clientLayout" ? (
                  <ClientLayout>{createComponent(item.component)}</ClientLayout>
                    // <AdminLayout>{createComponent(item.component)}</AdminLayout>
                    ) : item.config.structure == "layout" ? (
                      <AdminLayout>{createComponent(item.component)}</AdminLayout>
                  // <ClientLayout>{createComponent(item.component)}</ClientLayout>
                ) : (
                  <NoneLayout>{createComponent(item.component)}</NoneLayout>
                )
              }
            />
          );
        })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default RoutesMiddleware;
