import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";

import CustomerList from "src/pages/CustomerList";
import Dashboard from "src/pages/Dashboard";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";

import IngredientsList from "./pages/IngredientsList";
import Customer from "./pages/Customer";
import Product from "./pages/Product";
import OrdersList from "./pages/OrdersList";
import Order from "./pages/Order";
import OrderEdit from "./components/order/OrderEdit";
import Ingredient from "./pages/Ingredient";
import Profit from "./pages/Profit";
import Store from "./pages/Store";
import SingleStore from "./pages/SingleStore";
const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "customers", element: <CustomerList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "ingredients", element: <IngredientsList /> },
      { path: "orders", element: <OrdersList /> },
      {
        path: "ordersRanged/:startDate/:endDate",
        element: <OrdersList key={new Date().toISOString} />,
      },
      { path: "profits", element: <Profit /> },
      { path: "sales", element: <Store /> },

      { path: "/customers/:customerID", element: <Customer /> },
      { path: "/orders/:orderID", element: <Order /> },
      { path: "/orders/edit", element: <OrderEdit /> },
      { path: "/ingredients/:ingredientID", element: <Ingredient /> },
      { path: "/products/:productID", element: <Product /> },
      { path: "/sales/:saleID", element: <SingleStore /> },

      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
