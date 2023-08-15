import AuthForm from "@components/auth/employee/AuthForm";
import AuthTemplate from "@components/auth/employee/AuthTemplate";
import { memo } from "react";

function RegsiterPage() {
  return (
    <AuthTemplate>
      <AuthForm type="register" />
    </AuthTemplate>
  );
}

export default memo(RegsiterPage);
