import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Error404 } from "./pages";
import { Loader } from "./components/shared";
import Layout from "./components/Layout";
import Checkout from "./components/cart/Checkout";
import Confirm from "./components/cart/Confirm";
const ProductView = React.lazy(() => import("./pages/ProductView"));

const AppWithRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout component={<Home />} />} />
      <Route
        path="/prn/:name/prid/:id"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Layout component={<ProductView />} />
          </Suspense>
        }
      />
      <Route
        path="/not-found"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
      <Route
        path="/checkout"
        element={<Layout noFooter={true} component={<Checkout />} />}
      />
      <Route
        path="/confirm"
        element={<Layout noFooter={true} component={<Confirm />} />}
      />
      <Route
        path="*"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
    </Routes>
  );
};

export default AppWithRouting;
