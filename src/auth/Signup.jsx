import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Popup from "../pages/Popup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import imageApi from "../services/imageApi";
import api from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate(); //이동객체
  const [role, setRole] = useState(""); // 역할 선택 (요양사, 보호자)
  const [agree, setAgree] = useState(false); // 약관 동의
  const [username, setUsername] = useState(""); //유저네임 스테이트
  const [usernameValid, setUsernameValid] = useState(false); //유저네임 중복확인 가능 스테이트
  const [usernameConfirm, setUserNameConfirm] = useState(false); //중복확인 여부 스테이트
  const [confirmPwd, setConfirmPwd] = useState(false); //비밀번호 일치 확인 스테이트
  const [submitValid, setSubmitValid] = useState(true); //회원가입 제출 가능 스테이트
  const [userImage, setUserImage] = useState();
  // const [code, setCode] = useState(""); // 보호자 코드

  //리액트 훅 폼
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      realname: "",
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

  //회원가입 제출 핸들러
  const onSubmitHandler = async (data) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      realname,
      phone,
      address,
      ssn,
      relation,
      agree,
      code,
    } = data;

    // 이미지가 포함된 요청 데이터 정의
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("realname", realname);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("ssn", ssn);
    formData.append("relation", relation);
    formData.append("agree", agree);
    //배열로 넘겨주기 위해서 2번 추가
    formData.append("role", role);
    formData.append("role", role);

    //이미지파일이 있다면 추가
    if (userImage) {
      formData.append("userimage", userImage);
    }

    console.log("sendData:", JSON.stringify(formData, null, 2));

    //백엔드로 회원가입 요청 전송
    try {
      const response = await imageApi.post("/auth/public/signup", formData);
      reset();
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //리액트 훅 폼의 getValues는 값을 실시간으로 가져오지 않아서 watch 함수로 변경
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  //username에 4글자 이상 입력 시 중복검사 버튼 활성화
  useEffect(() => {
    console.log(usernameValid);
    setUsernameValid(username.length >= 4);
  }, [username]);

  //중복확인 통과, 약관 동의 시 제출 가능
  useEffect(() => {
    console.log("비밀번호", password);
    console.log("비확인", confirmPassword);
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        clearErrors("confirmPassword"); // 일치하는 경우 에러 메시지 제거
        setConfirmPwd(true); // 비밀번호 일치 상태로 설정
      } else {
        setConfirmPwd(false); // 비밀번호 불일치 상태로 설정
      }
    }
  }, [password, confirmPassword]); // 비밀번호 또는 비밀번호 확인 값이 변경될 때마다 실행

  //비밀번호 비교
  useEffect(() => {
    setConfirmPwd(false);
    setConfirmPwd(password == confirmPassword);
  }, [password, confirmPassword]);

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

  //가입버튼 활성화 이펙트
  useEffect(() => {
    setSubmitValid(false);
    if (agree && confirmPwd && usernameConfirm) {
      setSubmitValid(true);
    }
  }, [agree, confirmPwd, usernameConfirm]);

  //팝업창
  const openPopup = (e) => {
    e.preventDefault();
    const newWindow = window.open(
      "http://localhost:5173/popup/terms",
      "_blank",
      "width=1000,height=1000,left=300,top=200,resizable=yes,scrollbars=yes"
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="w-1/2 flex flex-col justify-start items-center ps-10 pe-10 pb-10 pt-5 bg-white">
        <h2 className="text-2xl font-bold mb-2">회원가입</h2>

        {/* 폼 시작 */}
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-3">
          {/* 역할 선택 */}
          <div className="grid grid-cols-2">
            <div
              className={`p-3 text-center ${
                role === "admin"
                  ? "border-2 border-gray-300 rounded-t-2xl border-b-0 text-gray-700"
                  : "border-b-2 border-gray-300"
              }`}
            >
              <label
                className={`block font-medium dark:text-white focus:border-gray-300 h-full${
                  role === "admin" ? " text-gray-700" : "text-gray-500 text-sm"
                }`}
              >
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                요양사로 회원가입
              </label>
            </div>
            <div
              className={`p-3 text-center  ${
                role === "user"
                  ? "border-2 border-gray-300 rounded-t-2xl border-b-0 text-gray-700"
                  : "border-b-2 border-gray-300"
              }`}
            >
              <label
                className={`block font-medium text-gray-500 dark:text-white h-full${
                  role === "user" ? " text-gray-700" : "text-gray-500 text-sm"
                }`}
              >
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                보호자로 회원가입
              </label>
            </div>
          </div>
          <div
            className={`border-2 border-gray-300 border-t-0 p-5 rounded-b-2xl`}
          >
            {/* 아이디 입력 */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* 이름 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="realname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("realname", {
                    required: { value: true, message: "성함을 적어주세요" },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  성함
                </label>
                {errors.realname?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.realname.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex">
                  <div className="relative z-0 w-full mb-5 group">
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
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      아이디
                    </label>
                  </div>
                  {/* 중복확인 버튼 */}
                  <button
                    type="button"
                    onClick={duplicateCheckHandle}
                    className={`ml-2 px-3 rounded mt-3 mb-3 text-xs ${
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
              <div className="relative z-0 w-full mb-5 group">
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
                      message: "비밀번호를 4자 이상 적어주세요",
                    },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  비밀번호
                </label>
                {errors.password?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  id="confirmPassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "비밀번호 확인을 적어주세요",
                    },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  비밀번호 확인
                </label>
                {errors.confirmPassword?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* 이메일 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("email", {
                    required: { value: true, message: "이메일을 적어주세요" },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  이메일
                </label>
                {errors.email?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* 휴대폰 번호 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "휴대전화 번호를 적어주세요",
                    },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  휴대폰 번호
                </label>
                {errors.phone?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* 주민등록번호 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="ssn"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("ssn", {
                    required: {
                      value: true,
                      message: "주민등록번호를 입력해주세요",
                    },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  주민등록번호
                </label>
                {errors.ssn?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.ssn.message}
                  </p>
                )}
              </div>

              {/* 주소 입력 */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  {...register("address", {
                    required: { value: true, message: "주소를 적어주세요" },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  주소
                </label>
                {errors.address?.message && (
                  <p className="text-sm font-semibold text-red-500 mt-0">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* 보호자 선택 시 환자와의 관계 입력 */}
              {role === "user" && (
                <>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      id="relation"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      {...register("relation", {
                        required: {
                          value: true,
                          message: "환자분과의 관계를 입력해주세요",
                        },
                      })}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      환자와의 관계
                    </label>
                    {errors.relation?.message && (
                      <p className="text-sm font-semibold text-red-500 mt-0">
                        {errors.relation.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* 사진 입력 */}

            <div>
              <label
                htmlFor="userimage"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                사진 등록
              </label>
              <input
                type="file"
                id="userimage"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
          </div>
          {/* 약관 동의 체크 */}
          <div className="flex items-center mt-4 ps-5 pe-5">
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
      {/* 오른쪽 배경이미지 시작 */}
      <div className="w-1/2 h-[100vh]">
        <img
          src={"/login3.jpg"}
          alt=""
          className="object-cover w-full h-full"
          style={{ borderRadius: "70px 0 0 0" }}
        />
      </div>
    </div>
  );
  // return (
  //   <div className="flex h-screen bg-gray-100">
  //     <div className="w-3/5 flex flex-col justify-center items-center p-10 bg-white shadow-lg rounded-lg">
  //       <h1 className="text-3xl font-bold mb-4 text-gray-900">회원가입</h1>
  //       <p className="text-gray-600 mb-6">
  //         필수 정보를 입력하고 회원가입을 완료하세요
  //       </p>

  //       <div className="w-full max-w-lg">
  //         <form onSubmit={handleSubmit(onSubmitHandler)}>
  //           {/* 역할 선택 */}
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             역할 선택
  //           </label>
  //           <div className="flex gap-4 mb-4">
  //             <label className="flex items-center">
  //               <input
  //                 type="radio"
  //                 value="admin"
  //                 checked={role === "admin"}
  //                 onChange={() => setRole("admin")}
  //                 className="mr-2"
  //               />{" "}
  //               요양사
  //             </label>
  //             <label className="flex items-center">
  //               <input
  //                 type="radio"
  //                 value="user"
  //                 checked={role === "user"}
  //                 onChange={() => setRole("user")}
  //                 className="mr-2"
  //               />{" "}
  //               보호자
  //             </label>
  //           </div>

  //           <label className="block text-sm font-medium text-gray-700">
  //             아이디
  //           </label>
  //           <div className="flex mb-4">
  //             <input
  //               type="text"
  //               placeholder="아이디 입력"
  //               className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
  //               {...register("username", {
  //                 required: "아이디를 입력해주세요",
  //                 minLength: {
  //                   value: 4,
  //                   message: "아이디는 4자 이상 입력해주세요",
  //                 },
  //               })}
  //             />
  //             <button
  //               type="button"
  //               onClick={duplicateCheckHandle}
  //               className="ml-2 bg-gray-300 text-black p-2 rounded-md"
  //             >
  //               중복확인
  //             </button>
  //           </div>

  //           <label className="block text-sm font-medium text-gray-700">
  //             비밀번호
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="비밀번호 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("password", {
  //               required: "비밀번호를 입력해주세요",
  //               minLength: {
  //                 value: 4,
  //                 message: "비밀번호는 4자 이상 입력해주세요",
  //               },
  //             })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             비밀번호 확인
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="비밀번호 확인"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("confirmPassword", {
  //               required: "비밀번호를 확인해주세요",
  //             })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             이름
  //           </label>
  //           <input
  //             type="text"
  //             placeholder="이름 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("realname", { required: "이름을 입력해주세요" })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             이메일
  //           </label>
  //           <input
  //             type="email"
  //             placeholder="이메일 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("email", { required: "이메일을 입력해주세요" })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             휴대폰 번호
  //           </label>
  //           <input
  //             type="tel"
  //             placeholder="휴대폰 번호 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("phone", { required: "휴대폰 번호를 입력해주세요" })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             주소
  //           </label>
  //           <input
  //             type="text"
  //             placeholder="주소 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("address", { required: "주소를 입력해주세요" })}
  //           />

  //           <label className="block text-sm font-medium text-gray-700">
  //             주민등록번호
  //           </label>
  //           <input
  //             type="text"
  //             placeholder="주민등록번호 입력"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             {...register("ssn", { required: "주민등록번호를 입력해주세요" })}
  //           />

  //           {role === "user" && (
  //             <>
  //               <label className="block text-sm font-medium text-gray-700">
  //                 관계
  //               </label>
  //               <input
  //                 type="text"
  //                 placeholder="환자와의 관계 입력"
  //                 className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //                 {...register("relation", {
  //                   required: "환자와의 관계를 입력해주세요",
  //                 })}
  //               />
  //             </>
  //           )}

  //           <label className="block text-sm font-medium text-gray-700">
  //             사진 업로드
  //           </label>
  //           <input
  //             type="file"
  //             className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
  //             onChange={handleImageChange}
  //           />

  //           <div className="flex items-center mb-4">
  //             <input
  //               type="checkbox"
  //               className="mr-2"
  //               {...register("agree", { required: "약관에 동의해주세요" })}
  //             />
  //             <span className="text-sm text-gray-700">
  //               I agree to the terms & policy
  //             </span>
  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800"
  //           >
  //             가입하기
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  // <div className="w-2/5 bg-blue-500"></div>
  //   </div>
  // );
};

export default Signup;

{
  /* <label className="block text-sm font-medium text-gray-700 mb-1">
                보호자 코드
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="보호자 코드 입력"
              /> */
}
