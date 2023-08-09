import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isLogined: boolean;
  element: React.ReactNode;
  fallbackPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isLogined,
  element,
  fallbackPath,
}) => {
  return isLogined ? (
    // 로그인 시에만
    <React.Fragment>{element}</React.Fragment>
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default PrivateRoute;
