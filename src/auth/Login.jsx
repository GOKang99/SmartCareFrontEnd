import React, { useEffect, useState } from "react";
import { useMyContext } from "../ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Login = () => {
  //jwt토큰 스테이트
  const [jwtToken, setJwtToken] = useState("");
  //컨텍스트에서 setToken과 token 가져오기
  const { setToken, token, deToken, setDeToken } = useMyContext();
  //이동객체
  const navigate = useNavigate();
  const { handleLogout } = useMyContext();
  const [loginError, setLoginError] = useState(false);

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
      setLoginError(false);
      reset(); //입력창 리셋
      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        console.log("여기서 찾자", decodedToken);
        handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        toast.success("로그인 성공, 반갑습니다!");
        console.log("로그인 성공");
      } else {
        toast.error("로그인 정보가 일치하지 않습니다");
        setLoginError(true);
        console.log("로그인 실패");
      }
    } catch (error) {
      if (error) {
        // toast.error(error.response.data.message);
        toast.error(error);
        setLoginError(true);
      }
    }
  };

  //토큰이 있다면 로그인 없이 홈으로 간다
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">환영합니다!</h1>
          <p className="text-gray-600 mb-6 text-sm">계정 정보를 입력해주세요</p>
          {/* 폼 시작 */}
          <form onSubmit={handleSubmit(onLoginHandler)}>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              {/* 이메일 입력 */}
              <div className="username_wrap">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    id="username"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    {...register("username", {
                      required: {
                        value: true,
                        message: "아이디를 입력해주세요",
                      },
                      minLength: {
                        value: 4,
                        message: "아이디는 4자 이상 적어주세요",
                      },
                    })}
                  />
                  <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    아이디
                  </label>
                </div>
                {/* errors는 리액트 훅 폼 라이브러리에서 각 필드의 오류 정보를 저장해주는 객체 */}
                {errors.username?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div className="pwd_wrap">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    {...register("password", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요",
                      },
                      minLength: {
                        value: 4,
                        message: "비밀번호는 4자 이상 적어주세요",
                      },
                    })}
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    비밀번호
                  </label>
                </div>
                {errors.password?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                로그인
              </button>
            </div>
          </form>
          {loginError && (
            <p className="text-sm font-semibold text-red-500 mt-0">
              로그인 정보를 확인해주세요
            </p>
          )}
        </div>
        <div className="mt-1 text-center relative w-[50%]">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300"></div>
          <span className="relative bg-white px-4 text-gray-500">or</span>
        </div>

        {/* 하단 링크 */}
        <div className="mt-4 ms-2 text-sm text-center font-medium text-gray-600 dark:text-gray-300">
          계정이 없으신가요?
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-[100vh] bg-white">
        <img
          src={"/login3.jpg"}
          alt=""
          className="object-cover w-full h-full"
          style={{ borderRadius: "70px 0 0 0" }}
        />
      </div>
    </div>
  );
};

export default Login;

// return (
// <div className="flex h-screen bg-gray-100">
//   <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white">
//     <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
//     <p className="text-gray-600 mb-6">
//       Enter your Credentials to access your account
//     </p>

//     <div className="w-full max-w-md">
//       <form onSubmit={handleSubmit(onLoginHandler)}>
//         <label className="block text-sm font-medium text-gray-700">
//           아이디
//         </label>
//         <input
//           type="text"
//           placeholder="아이디 입력"
//           className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
//           {...register("username", {
//             required: "아이디를 입력해주세요",
//             minLength: {
//               value: 4,
//               message: "아이디는 4자 이상 적어주세요",
//             },
//           })}
//         />
//         {errors.username?.message && (
//           <p className="text-sm font-semibold text-red-500 mt-0">
//             {errors.username.message}
//           </p>
//         )}

//         <label className="block text-sm font-medium text-gray-700 mt-4">
//           비밀번호
//         </label>
//         <input
//           type="password"
//           placeholder="비밀번호 입력"
//           className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
//           {...register("password", {
//             required: "비밀번호를 입력해주세요",
//             minLength: {
//               value: 4,
//               message: "비밀번호는 4자 이상 적어주세요",
//             },
//           })}
//         />
//         {errors.password?.message && (
//           <p className="text-sm font-semibold text-red-500 mt-0">
//             {errors.password.message}
//           </p>
//         )}

//         <button
//           type="submit"
//           className="w-full mt-6 bg-green-700 text-white p-3 rounded-md hover:bg-green-800"
//         >
//           로그인
//         </button>
//       </form>

//<div className="mt-6 text-center relative">
//<div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300"></div>
//<span className="relative bg-white px-4 text-gray-500">or</span>
//</div>

//       <p className="mt-4 text-center text-gray-600">
//         계정이 없으신가요?{" "}
//         <Link to="/signup" className="text-blue-600">
//           회원가입
//         </Link>
//       </p>
//     </div>
//   </div>
//   <div className="w-1/2 bg-blue-500"></div>
// </div>
// );
