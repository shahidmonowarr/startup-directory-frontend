import LoginRegisterForm from "../../components/Form/LoginRegistrationForm";

const Login = () => {
  return (
    <div className="max-w-[1280px] mx-auto my-20">
      <LoginRegisterForm
        formTitle="Login Here"
        formType="login"
        submitBtn="Login"
      />
    </div>
  );
};

export default Login;
