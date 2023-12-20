/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogin, userRegister } from "../../redux/features/user/userActions";
import { useAppDispatch } from "../../redux/hook";
import InputType from "../InputType/InputType";

interface IFormType {
  formType: string;
  submitBtn: string;
  formTitle: string;
}

const LoginRegisterForm = ({ formType, submitBtn, formTitle }: IFormType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from: string = location.state?.from?.pathname || "/";

  const dispatch = useAppDispatch();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const login: PayloadAction<any> = await dispatch(userLogin(credentials));
      if (
        login.payload &&
        login.payload.user &&
        login.payload.user.email &&
        login.payload.user.name
      ) {
        toast.success("Successfully Logged in");

        navigate(from, { replace: true });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const credentials = { name, email, password };
      const register: PayloadAction<any> = await dispatch(
        userRegister(credentials)
      );
      if (
        register.payload &&
        register.payload.user &&
        register.payload.user.email &&
        register.payload.user.name
      ) {
        toast.success("Successfully registered");

        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[380px] mx-auto bg-gray-100 p-10 rounded-lg">
      <div>
        <div className="flex justify-center"></div>
        <h2 className="my-5 text-2xl font-bold text-center">{formTitle}</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={formType === "login" ? handleLogin : handleRegister}
        >
          {/* Switch statement */}
          {(() => {
            switch (true) {
              case formType === "register": {
                return (
                  <>
                    <div className="flex flex-col">
                      <InputType
                        id="name"
                        label="Name"
                        labelClassName="text-lg font-semibold"
                        name="name"
                        placeholder="Enter your name"
                        type="text"
                        className="px-2 py-1 border rounded-lg outline-none"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </>
                );
              }
            }
          })()}
          <div className="flex flex-col">
            <InputType
              id="email"
              label="Email"
              labelClassName="text-lg font-semibold"
              name="email"
              placeholder="Email address"
              type="email"
              className="px-2 py-1 border rounded-lg outline-none"
              autoComplete={formType === "register" ? "off" : "on"}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <InputType
              id="password"
              label="Password"
              labelClassName="text-lg font-semibold"
              name="password"
              placeholder="Password"
              type="password"
              className="px-2 py-1 border rounded-lg outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {formType === "login" ? (
              <p>
                Not registered yet? Register{" "}
                <Link
                  to="/auth/register"
                  className="font-bold text-blue-700 link"
                >
                  Here !
                </Link>
              </p>
            ) : (
              <p>
                Already user? Please{" "}
                <Link to="/auth/login" className="font-bold text-blue-700 link">
                  Login !
                </Link>
              </p>
            )}
          </div>

          <button className="mt-5 btn btn-error">{submitBtn}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
