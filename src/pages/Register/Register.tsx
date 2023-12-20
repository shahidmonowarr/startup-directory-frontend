import LoginRegisterForm from "../../components/Form/LoginRegistrationForm";

const Register = () => {
  return (
    <div className="max-w-[1280px] mx-auto my-20">
      <LoginRegisterForm
        formTitle="Register Here"
        formType="register"
        submitBtn="Register"
      />
    </div>
  );
};

export default Register;
