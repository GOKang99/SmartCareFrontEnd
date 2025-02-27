import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const { token } = useMyContext();
  // 입력값을 저장하는 state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    userId: jwtDecode(token).userId,
  });
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState({});

  //입력필드 공통 핸들러
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 변경 버튼 클릭 시 실행
  const handleChangePassword = (e) => {
    e.preventDefault();

    const errors = {};

    // 유효성 검사(현재 비밀번호, 새 비밀번호, 비밀번호 확인 등)
    if (!passwords.currentPassword) {
      errors.currentPassword = "현재 비밀번호를 입력해주세요.";
    }
    if (!passwords.newPassword) {
      errors.newPassword = "새 비밀번호를 입력해주세요.";
    }
    if (!passwords.confirmPassword) {
      errors.confirmPassword = "확인용 비밀번호를 입력해주세요.";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      errors.equalPassword = "새 비밀번호가 일치하지 않습니다.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("필수 내용을 입력해주세요");
      return;
    }

    sandPassword(passwords); //백엔드로 제출

    handleClose(); //모달창 스테이트 초기화 및 모달창 닫기
  };

  //비밀번호 변경 제출함수
  const sandPassword = async (data) => {
    try {
      const response = await api.post("/auth/public/changepwd", data);
      console.log("비밀번호 변경", response.data);
      if (response.data == "wrong password") {
        toast.error("현재 비밀번호가 일치하지 않습니다");
      } else {
        toast.success("비밀번호 변경 성공");
      }
    } catch (error) {
      toast.error("비밀번호 변경 오류");
    }
  };

  const handleClose = () => {
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      userId: jwtDecode(token).userId,
    });
    setErrors({});
    onClose();
    console.log("패스워드즈", passwords);
  };

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>
        <form onSubmit={handleChangePassword}>
          {/* 현재 비밀번호 입력 */}
          <label className="block text-sm font-medium text-gray-700">
            현재 비밀번호
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange} // ✅ 실시간 반영
            className="w-full p-2 border rounded-md mb-2 text-black"
            placeholder="현재 비밀번호 입력"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
          )}

          {/* 새 비밀번호 입력 */}
          <label className="block text-sm font-medium text-gray-700">
            새 비밀번호
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange} // ✅ 실시간 반영
            className="w-full p-2 border rounded-md mb-2 text-black"
            placeholder="새 비밀번호 입력"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}

          {/* 새 비밀번호 확인 입력 */}
          <label className="block text-sm font-medium text-gray-700">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange} // ✅ 실시간 반영
            className="w-full p-2 border rounded-md mb-2 text-black"
            placeholder="새 비밀번호 확인"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          {errors.equalPassword && (
            <p className="text-red-500 text-sm">{errors.equalPassword}</p>
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

export default PasswordChangeModal;
