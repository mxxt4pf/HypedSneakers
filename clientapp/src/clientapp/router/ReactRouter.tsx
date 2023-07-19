import { createBrowserRouter } from "react-router-dom";
import Home from "../../features/Home/Home";
import ProductCatalog from "../../features/ProductCatalog/ProductCatalog";
import ItemInfo from "../../features/ProductCatalog/ItemInfo";
import About from "../../features/About/About";
import ContactUs from "../../features/ContactUs/ContactUs";
import App from "../view/App";
import CartPage from "../../features/cart/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "", element: <Home></Home> },
      {
        path: "productcatalog",
        element: <ProductCatalog></ProductCatalog>,
      },
      {
        ///:id represent the id of the product to be loaded
        path: "productcatalog/:id",
        element: <ItemInfo></ItemInfo>,
      },
      {
        path: "aboutus",
        element: <About></About>,
      },
      {
        path: "contactus",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "cartpage",
        element: <CartPage></CartPage>,
      },
    ],
  },
]);
