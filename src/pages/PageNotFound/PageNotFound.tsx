import { useNavigate } from "react-router-dom";
import pageNotFound from "./../../assets/404.jpg";

const PageNotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(`/`);
  }, 3000);
  return (
    <div>
      <img
        className="w-full h-[100vh]"
        src={pageNotFound}
        alt="Page not found"
      />
    </div>
  );
};

export default PageNotFound;
