import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import MainLayout from "./layout/MainLayout";
import { currentUser } from "./redux/features/user/userActions";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(currentUser());
  }, [dispatch]);

  if (user.isLoading && !user.isSuccess) {
    return <Spinner />;
  }
  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  );
}

export default App;
