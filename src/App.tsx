import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./pages/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Card from "./pages/CartPage/Card";
import Dashboard from "./pages/Dashboard/Dashboard";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import PaymentSuccess from "./pages/PaymentSuccessPage/PaymentSuccess";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Products",
        element: <ProductsPage />,
      },
      {
        path: "Product/:id",
        element: <ProductDetails />,
        loader: ({params}) => { return params }
      },
      {
        path: "Cart",
        element: <Card />,
      },
      {
        path: "Payment",
        element: <PaymentPage />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "PaymentSuccess",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

function App() {
  return  <Provider store={store}><RouterProvider router={Router} /></Provider> ;
}

export default App;
