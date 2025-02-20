import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Popup from "../pages/Popup";
import { useMyContext } from "../ContextApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL; //백엔드 주소
  const { token } = useMyContext(); //컨텍스트에서 토큰변수 가져오기
  const navigate = useNavigate(); //이동객체

  //리액트 훅 폼
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: [role],
    };
  };

  const [role, setRole] = useState(""); // 역할 선택 (1: 요양사, 2: 보호자)
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ssn, setSsn] = useState(""); // 주민등록번호
  const [relation, setRelation] = useState(""); // 보호자 관계
  const [code, setCode] = useState(""); // 보호자 코드
  const [agree, setAgree] = useState(false); // 약관 동의

  // 아이디 중복 확인 (나중에 백엔드 연동)
  const handleCheckDuplicate = () => {
    alert("아이디 중복 확인 기능은 나중에 구현됩니다.");
  };
  useEffect(() => {
    console.log(role);
  }, [role]);
  const openPopup = (e) => {
    e.preventDefault();
    const newWindow = window.open(
      "",
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

  // 회원가입 버튼 클릭
  const handleRegister = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("약관에 동의해야 가입할 수 있습니다.");
      return;
    }

    console.log("회원가입 요청:", {
      role,
      username,
      userId,
      password,
      email,
      phone,
      address,
      ssn,
      relation,
      code,
    });

    alert("회원가입 기능은 나중에 구현됩니다.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 overflow-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          회원가입
        </h2>

        <form onSubmit={handleRegister}>
          {/* 역할 선택 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            역할 선택
          </label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="1"
                checked={role === "1"}
                onChange={() => setRole("1")}
                className="mr-2"
              />
              요양사
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="2"
                checked={role === "2"}
                onChange={() => setRole("2")}
                className="mr-2"
              />
              보호자
            </label>
          </div>

          {/* 아이디 입력 + 중복 확인 버튼 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <div className="flex">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="아이디 입력"
                required
              />
              <button
                type="button"
                onClick={handleCheckDuplicate}
                className="ml-2 bg-gray-300 text-black px-3 rounded cursor-pointer"
              >
                중복확인
              </button>
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="비밀번호 입력"
            required
          />

          {/* 비밀번호 확인 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="비밀번호 확인"
            required
          />

          {/* 이름 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="이름 입력"
            required
          />

          {/* 이메일 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="이메일 입력"
            required
          />

          {/* 휴대폰 번호 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            휴대폰 번호
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="휴대폰 번호 입력"
            required
          />

          {/* 주소 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주소
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="주소 입력"
            required
          />

          {/* 보호자 선택 시 추가 입력 필드 */}
          {role === "2" && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                관계
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="환자와의 관계 입력"
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                주민등록번호
              </label>
              <input
                type="text"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="주민등록번호 입력"
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                보호자 코드
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
                placeholder="보호자 코드 입력"
                required
              />
            </>
          )}

          {/* 약관 동의 체크 */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 cursor-pointer"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
