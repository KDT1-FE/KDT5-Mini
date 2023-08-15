import AuthForm from "@components/auth/employee/AuthForm";
import AuthTemplate from "@components/auth/employee/AuthTemplate";
import { memo } from "react";

function LoginPage() {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
}

export default memo(LoginPage);
