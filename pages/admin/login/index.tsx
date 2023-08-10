import AdminAuthForm from "@components/auth/admin/AdminAuthForm";
import AdminAuthTemplate from "@components/auth/admin/AdminAuthTemplate";
import { memo } from "react";

function LoginPage() {
  return (
    <AdminAuthTemplate>
      <AdminAuthForm />
    </AdminAuthTemplate>
  );
}

export default memo(LoginPage);
