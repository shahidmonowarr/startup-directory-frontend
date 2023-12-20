import { Link } from "react-router-dom";
import { userLogout } from "../../redux/features/user/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import logo from "./../../assets/logo.png";
import userIcon from "./../../assets/userIcon.png";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    void dispatch(userLogout());
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/startups">Startups</Link>
      </li>
      {user?.email && (
        <>
          <li>
            <Link to="/addNewStartup">Add Startup</Link>
          </li>
          <li>
            <Link to="/my-Startups">My Startups</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="navbar justify-between max-w-[1280px] ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="max-h-[60px]">
            <img className="h-full w-[100px] mt-[-20px]" src={logo} alt="" />
          </Link>
        </div>

        <div className="gap-2 navbar-center">
          <div className="flex-none hidden lg:flex">
            <ul className="gap-3 px-1 menu menu-horizontal">{menuItems}</ul>
          </div>

          {user && (
            <div className="dropdown dropdown-end ">
              <label
                tabIndex={0}
                className="border-gray-500 btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={userIcon} alt="user-icon" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {user && (
                  <li>
                    <a className="justify-between">{user.name}</a>
                    <a className="justify-between">{user.email}</a>
                  </li>
                )}
                <li>
                  <a className="justify-between">Profile</a>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div className="flex gap-2">
              <Link to="/auth/login">
                <button className="btn btn-error btn-outline">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn btn-error btn-outline">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
