import React, { useEffect, useState } from "react";
import { useMyContext } from "../ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  //jwt토큰 스테이트
  const [jwtToken, setJwtToken] = useState("");
  //컨텍스트에서 setToken과 token 가져오기
  const { setToken, token, deToken, setDeToken } = useMyContext();
  //이동객체
  const navigate = useNavigate();

  //리액트 훅 폼 사용
  const {
    register, //입력 필드를 register(등록)해서 폼 상태와 연결
    handleSubmit, //폼 제출 처리 함수
    reset, //리셋
    formState: { errors }, //폼 오류 상태
  } = useForm({
    defaultValues: {
      //공백으로 변수 초기화
      username: "",
      password: "",
      code: "",
    },
    mode: "onTouched",
  });

  //로그인 성공시 실행될 함수
  const handleSuccessfulLogin = (token, decodedToken) => {
    //토큰을 해석한 뒤 user객체에 username과 roles를 저장
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    //로컬스토리지에 토큰 저장
    localStorage.setItem("JWT_TOKEN", token);
    //로컬스토리지에 위에서 저장한 user객체 내용 저장
    localStorage.setItem("USER", JSON.stringify(user));

    //로그인 성공시 컨텍스트에 토큰을 저장
    setToken(token);
    //로그인 성공시 컨텍스트에 해독된 토큰을 저장
    setDeToken(jwtDecode(token));
    //로그인성공시 메인으로 이동
    navigate("/main");
  };

  //로그인 함수
  const onLoginHandler = async (data) => {
    try {
      const response = await api.post("/auth/public/signin", data);
      reset(); //입력창 리셋
      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        console.log("여기서 찾자", decodedToken);
        handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        console.log("로그인 성공");
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      if (error) {
        console.log("로그인 실패");
      }
    }
  };

  //토큰이 있다면 로그인 없이 홈으로 간다
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          로그인
        </h2>

        {/* 폼 시작 */}
        <form onSubmit={handleSubmit(onLoginHandler)}>
          {/* 이메일 입력 */}
          <div className="username_wrap">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="아이디 입력"
              {...register("username", {
                required: { value: true, message: "아이디를 입력해주세요" },
                minLength: {
                  value: 4,
                  message: "아이디는 4자 이상 적어주세요",
                },
              })}
            />
            {/* errors는 리액트 훅 폼 라이브러리에서 각 필드의 오류 정보를 저장해주는 객체 */}
            {errors.username?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="pwd_wrap">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="비밀번호 입력"
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상 적어주세요",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <div className="mt-4 text-center text-sm">
          계정이 없으신가요? &nbsp;
          <a href="#" className="text-sm text-blue-500 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
