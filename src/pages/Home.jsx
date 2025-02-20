import React, { useState } from "react";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { token } = useMyContext();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 요청:", { id, password });
    alert("로그인 기능은 나중에 구현됩니다.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          홈 화면입니다
        </h2>

        <form onSubmit={handleLogin}>
          {/* 이메일 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            아이디
          </label>
          <input
            type="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="아이디 입력"
            required
          />

          {/* 비밀번호 입력 */}
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="비밀번호 입력"
            required
          />

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
