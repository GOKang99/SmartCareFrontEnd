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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
    }
  };

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

          {/* 이름 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              성함
            </label>
            <input
              type="text"
              id="realname"
              className="w-full p-2 border rounded-md mb-3"
              placeholder="성함 입력"
              {...register("realname", {
                required: { value: true, message: "성함을 적어주세요" },
              })}
            />
            {errors.realname?.message && (
              <p className="text-sm font-semibold text-red-500 mt-0">
                {errors.realname.message}
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

          {/* 휴대폰 번호 입력 */}
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

          {/* 주소 입력 */}
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

          {/* 주민등록번호 입력 */}
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

          {/* 보호자 선택 시 환자와의 관계 입력 */}
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
            </>
          )}

          {/* 사진 입력 */}
          <div>
            <label
              htmlFor="userimage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              사진 등록
            </label>
            <input
              type="file"
              id="userimage"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md mb-3"
            />
          </div>

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
