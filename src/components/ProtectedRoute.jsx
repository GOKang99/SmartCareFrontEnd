import React from "react";
import { useMyContext } from "../ContextApi";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminPage }) => {
  //컨텍스트로 토큰과 어드민을 가져온다
  const { token, isAdmin } = useMyContext();

  //1. 토큰이 없으면 로그인창으로 이동(인증이 안된 경우)
  if (!token) {
    return <Navigate to="/login" />;
  }

  //2. 인증이 된 유저이지만 관리자권한없이 관리자페이지 요청시 디나이
  if (token && adminPage && !isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
