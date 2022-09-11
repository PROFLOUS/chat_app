import LoginForm from "../components/form/LoginForm";
import "./LoginPageStyle.scss";
import RegisterForm from "../components/form/RegisterForm";
import { useTranslation } from "react-i18next";
const RegisterPage = ({ setToken }) => {
  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();
  return (
    <div className="login" style={{ height: "auto" }}>
      <h1>Zalo</h1>
      <p className="text">{t("registerTitle")}</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
