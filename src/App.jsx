import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLAyout";
import Hero from "./components/Hero";
import Signin from "./components/Signing";
import CreateAccountForm from "./components/CreateAccountForm";
import TextileGenerate from "./components/TextileDesign/textileGenerate";
import TextilePage from "./components/TextileDesign/textilePage";
import Contact from "./components/Contact";
import AccountPage from "./components/Account";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUserFromStorage } from "./features/auth/authSlice";
import { fetchPurchasedPlan } from "./features/plan/planSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextileDesignPage from "./components/TextileDesign/textileGrid";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/get",
        element: <CreateAccountForm />,
      },
      {
        path: "/textile",
        element: <TextileGenerate />,
      },
      {
        path: "/textileai",
        element: <TextilePage />,
      },
      {
        path: "/textilegrid",
        element: <TextileDesignPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
]);

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(fetchPurchasedPlan());
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppInitializer />
    </Provider>
  );
}

export default App;
