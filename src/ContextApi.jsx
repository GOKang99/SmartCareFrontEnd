import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./services/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

//컨텍스트 생성
const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  //로컬스토리지에 토큰이 있다면 JSON문자열로 가져오고, 없다면 null
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;

  //로컬스토리지에 저장된 유저가 관리자라면 JSON문자열로 가져오고, 없다면 false
  const IsAdmin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;

  //토큰 스테이트
  const [token, setToken] = useState(getToken);
  //현재 로그인 유저 관리
  const [currentUser, setCurrentUser] = useState(null);
  //관리자인지 확인하는 스테이트
  const [isAdmin, setIsAdmin] = useState(IsAdmin);
  //해석된 토큰 스테이트
  const [deToken, setDeToken] = useState(null);
  //보호자 아이디 저장 스테이트
  const [guardId, setGuardId] = useState(null);
  //요양 보호사 아이디 저장 스테이트
  const [giverId, setGiverId] = useState(null);
  //유저데이터(환자 포함)
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    //로컬스토리지에서 USER라는 키에 저장된 데이터를 JSON에서 자바스크립트 객체로 변환
    const user = JSON.parse(localStorage.getItem("USER"));
    if (user?.username) {
      try {
        //서버로부터 받은 응답은 data라는 변수에 할당
        //현재 로그인한 사용자의 정보를 axios로 가져온다
        const { data } = await api.get(`/auth/user`);
        console.log("데이터", data);
        //서버의 응답 data에서 권한 배열을 저장
        const roles = data.roles;

        //권한배열에 관리자 권한이 있을 경우
        if (roles.includes("ROLE_ADMIN")) {
          //로컬스토리지에 IS_ADMIN라는 키값에 true를 JSON문자열로 변환해서 설정
          //로컬스토리지에는 항상 문자열이어야 하므로 true를 stringify를 써서 문자열로 변환해서 저장
          localStorage.setItem("IS_ADMIN", JSON.stringify(true));
          //setIsAdmin 상태를 true로 업데이트한다
          setIsAdmin(true);
        } else {
          //권한 배열에서 관리자 권한이 없는 경우
          //로컬스토리지에서 IS_ADMIN이라는 키를 삭제
          localStorage.removeItem("IS_ADMIN");
          //setIsAdmin 상태를 false로 업데이트
          setIsAdmin(false);
        }
        //백엔드에서 받아온 유저 데이터를 최근 유저 스테이트에 업데이트
        setCurrentUser(data);
      } catch (error) {
        //오류시
        toast.error("현재 유저정보를 업데이트하는데 실패했습니다");
        console.error(error);
      }
    }
  };

  //처음 시작하거나 token의 값이 변경되면 유저 정보를 가져온다
  useEffect(() => {
    //token이 있을 경우
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    //로그아웃시 로컬스토리지와 유저 관련 변수 초기화, 메인화면으로 이동
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(null);
    setDeToken(null);
    navigate("/");
  };

  //토큰 해독하기
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDeToken(decoded);
    }
  }, [token]);

  //역할에 따라 저장하기

  useEffect(() => {
    if (isAdmin) {
      console.log("요양보호사 입니다." + isAdmin);
      setGiverId(deToken?.partId);
      console.log("요양보호사 아이디는", giverId);
    } else {
      console.log("어드민이 아닙니다." + isAdmin);
      setGuardId(deToken?.partId);
      console.log("보호자 아이디는", guardId);
    }
  }, [isAdmin, deToken?.partId]);

  //유저데이터 컨텍스트 패스에 저장하기
  //환자 아이디 가지고 오려면 userData.residentId
  //deToken이 있고, userId가 있다면 실행
  useEffect(() => {
    if (deToken && deToken?.userId) {
      const fetchUserData = async () => {
        try {
          const { data } = await api.get(`/users/${deToken.userId}`);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [deToken?.userId]);

  //컨텍스트 프로바이더 설정(value에 객체형태로 담기)
  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        deToken,
        setDeToken,
        guardId,
        giverId,
        userData,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

//2개의 항목을 각각 내보내기 위해서 export 2번 사용
//useMyContext()로 이 컨텍스트 사용
export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
