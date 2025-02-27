import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Popup from "../pages/Popup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate(); //이동객체
  const [role, setRole] = useState(""); // 역할 선택 (1: 요양사, 2: 보호자)
  const [code, setCode] = useState(""); // 보호자 코드
  const [agree, setAgree] = useState(false); // 약관 동의
  const [username, setUsername] = useState(""); //유저네임 스테이트
  const [usernameValid, setUsernameValid] = useState(false); //유저네임 중복확인 가능 스테이트
  const [usernameConfirm, setUserNameConfirm] = useState(false); //중복확인 여부 스테이트
  const [submitValid, setSubmitValid] = useState(true); //회원가입 제출 가능 스테이트

  //username에 4글자 이상 입력 시 중복검사 버튼 활성화
  useEffect(() => {
    console.log(usernameValid);
    setUsernameValid(username.length >= 4);
  }, [username]);

  //중복확인 통과, 약관 동의 시 제출 가능
  useEffect(() => {
    setSubmitValid(usernameConfirm && agree);
  }, [usernameConfirm, agree]);

  //리액트 훅 폼
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      ssn: "",
      relation: "",
      agree: "",
      code: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      phone,
      address,
      ssn,
      relation,
      agree,
      code,
    } = data;
    const sendData = {
      username,
      email,
      password,
      confirmPassword,
      phone,
      address,
      ssn,
      relation,
      agree,
      code,
      role: [role],
    };
    console.log("sendData:", JSON.stringify(sendData, null, 2));
    const response = await api.post("/auth/public/signup", sendData);
    reset();
    if (response.data) {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  //아이디 중복확인 버튼
  const duplicateCheckHandle = () => {
    const { username } = getValues();
    const checkData = { username: username };
    console.log("체크", checkData);
    sendUsername(checkData);
  };

  //아이디 중복확인 백엔드 요청
  const sendUsername = async (data) => {
    try {
      setUserNameConfirm(false);
      const response = await api.post("/auth/public/checkuser", data);
      console.log("레스", response);
      if (response.status == 200) {
        setUserNameConfirm(true);
        toast.success("사용가능한 유저네임입니다");
      } else {
        setUserNameConfirm(false);
        toast.error("이미 존재하는 유저네임입니다");
      }
    } catch (error) {
      setUserNameConfirm(false);
      toast.error("이미 존재하는 유저네임입니다");
    }
  };

  const openPopup = (e) => {
    e.preventDefault();
    const newWindow = window.open(
      "http://localhost:5173/popup/terms",
      "_blank",
      "width=500,height=600,left=300,top=200,resizable=yes,scrollbars=yes"
    );

    if (newWindow) {
      newWindow.document.body.innerHTML = '<div id="root"></div>'; // 빈 컨테이너 추가
      newWindow.document.title = "이용약관"; // 제목 설정

      newWindow.setAgreement = (value) => {
        setAgree(value); // 부모 창에서 약관 체크 상태 변경
      };

      window.popupWindow = newWindow;

      //React 컴포넌트 마운트
      const root = ReactDOM.createRoot(
        newWindow.document.getElementById("root")
      );
      root.render(<Popup popupWindow={newWindow} />);
    }
  };

  useEffect(() => {
    window.setAgreement = (value) => {
      setAgree(value);
    };
  }, []);

  // // 회원가입 버튼 클릭
  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   if (!agree) {
  //     alert("약관에 동의해야 가입할 수 있습니다.");
  //     return;
  //   }

  //   console.log("회원가입 요청:", {
  //     role,
  //     username,
  //     userId,
  //     password,
  //     email,
  //     phone,
  //     address,
  //     ssn,
  //     relation,
  //     code,
  //   });

  //   alert("회원가입 기능은 나중에 구현됩니다.");
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 overflow-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          회원가입
        </h2>

        {/* 폼 시작 */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* 역할 선택 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            역할 선택
          </label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="mr-2"
              />
              요양사
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="mr-2"
              />
              보호자
            </label>
          </div>

          {/* 아이디 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <div className="flex">
              <input
                type="text"
                id="username"
                className="w-full p-2 border rounded-md"
                placeholder="아이디 입력"
                {...register("username", {
                  required: { value: true, message: "아이디를 입력해주세요" },
                  minLength: {
                    value: 4,
                    message: "아이디는 4자 이상 적어주세요",
                  },
                })}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* 중복확인 버튼 */}
              <button
                type="button"
                onClick={duplicateCheckHandle}
                className={`ml-2 px-3 rounded  ${
                  usernameValid
                    ? "bg-gray-300 text-black cursor-pointer"
                    : "bg-gray-200 text-gray-500 opacity-50"
                }`}
                disabled={!usernameValid}
              >
                중복확인
              </button>
            </div>
            {errors.username?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="비밀번호 입력"
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
                minLength: {
                  value: 4,
                  message: "비밀번호를 4자 이상 적어주세요",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "비밀번호 확인을 적어주세요",
                },
              })}
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* 이메일 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="이메일 입력"
              {...register("email", {
                required: { value: true, message: "이메일을 적어주세요" },
              })}
            />
            {errors.email?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              휴대폰 번호
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="휴대폰 번호 입력"
              {...register("phone", {
                required: {
                  value: true,
                  message: "휴대전화 번호를 적어주세요",
                },
              })}
            />
            {errors.phone?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주소
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="주소 입력"
              {...register("address", {
                required: { value: true, message: "주소를 적어주세요" },
              })}
            />
            {errors.address?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주민등록번호
            </label>
            <input
              type="text"
              id="ssn"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="주민등록번호 입력"
              {...register("ssn", {
                required: {
                  value: true,
                  message: "주민등록번호를 입력해주세요",
                },
              })}
            />
            {errors.ssn?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.ssn.message}
              </p>
            )}
          </div>

          {/* 보호자 선택 시 추가 입력 필드 */}
          {role === "user" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  관계
                </label>
                <input
                  type="text"
                  id="relation"
                  className="w-full p-2 border rounded-md mb-3"
                  placeholder="환자와의 관계 입력"
                  {...register("relation", {
                    required: {
                      value: true,
                      message: "환자분과의 관계를 입력해주세요",
                    },
                  })}
                />
                {errors.relation?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.relation.message}
                  </p>
                )}
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                보호자 코드
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="보호자 코드 입력"
              />
            </>
          )}

          {/* 약관 동의 체크 */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => {
                setAgree(!agree);
                console.log("어그리", agree);
              }}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              <a href="#" onClick={openPopup} className="text-blue-500">
                약관
              </a>
              에 동의합니다.
            </span>
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg mt-4 ${
              submitValid
                ? "bg-blue-500  cursor-pointer "
                : "bg-blue-500 text-white py-2 rounded-lg mt-4 opacity-50"
            }`}
            disabled={!submitValid}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
