import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserExitModal = ({ isOpen, onClose }) => {
  const { setToken, setCurrentUser, setIsAdmin, setDeToken } = useMyContext();
  const { token } = useMyContext();
  // 입력값을 저장하는 state
  const [exitData, setExitData] = useState({
    password: "",
    userId: jwtDecode(token).userId,
  });
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //입력필드 공통 핸들러
  const handleExitUser = (e) => {
    const { name, value } = e.target;
    setExitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 변경 버튼 클릭 시 실행
  const handleChangePassword = (e) => {
    e.preventDefault();

    const errors = {};

    // 유효성 검사(현재 비밀번호, 새 비밀번호, 비밀번호 확인 등)
    if (!exitData.password) {
      errors.password = "현재 비밀번호를 입력해주세요.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("필수 내용을 입력해주세요");
      return;
    }

    sandExit(exitData); //백엔드로 제출

    handleClose(); //모달창 스테이트 초기화 및 모달창 닫기
  };

  //비밀번호 변경 제출함수
  const sandExit = async (data) => {
    try {
      const response = await api.post("/auth/public/exituser", data);
      console.log("회원탈퇴", response);
      toast.success("회원탈퇴가 완료되었습니다");
      handleLogout();
    } catch (error) {
      if (error) {
        console.log("에러", error);
        toast.error("회원탈퇴 오류");
      }
    }
  };

  const handleClose = () => {
    setExitData({
      password: "",
      userId: jwtDecode(token).userId,
    });
    setErrors({});
    onClose();
    console.log("엑싯", exitData);
  };

  //회원탈퇴 시 로그아웃 함수
  const handleLogout = () => {
    //로그아웃시 로컬스토리지와 유저 관련 변수 초기화, 메인화면으로 이동
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(null);
    setDeToken(null);
    navigate("/login");
  };

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">회원탈퇴</h2>
        <form onSubmit={handleChangePassword}>
          {/* 현재 비밀번호 입력 */}
          <label className="block text-sm font-medium text-gray-700">
            비밀번호 입력
          </label>
          <input
            type="password"
            name="password"
            value={exitData.password}
            onChange={handleExitUser} // ✅ 실시간 반영
            className="w-full p-2 border rounded-md mb-2 text-black"
            placeholder="현재 비밀번호 입력"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* 버튼 영역 */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 cursor-pointer"
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
              변경하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserExitModal;
