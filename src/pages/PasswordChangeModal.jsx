import React, { useState } from "react";

const PasswordChangeModal = ({ isOpen, onClose }) => {
  // 입력값을 저장하는 state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // 입력 필드가 실시간으로 반영되도록 onChange 이벤트 추가
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    console.log("현재 비밀번호:", e.target.value); // 디버깅용 콘솔 출력
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    console.log("새 비밀번호:", e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    console.log("새 비밀번호 확인:", e.target.value);
  };

  // 비밀번호 변경 버튼 클릭 시 실행
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경 요청 (나중에 백엔드 연동)");
    setMessage("비밀번호가 변경되었습니다!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
    onClose();
  };

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>

        {/* 현재 비밀번호 입력 */}
        <label className="block text-sm font-medium text-gray-700">
          현재 비밀번호
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange} // ✅ 실시간 반영
          className="w-full p-2 border rounded-md mb-2 text-black"
          placeholder="현재 비밀번호 입력"
        />

        {/* 새 비밀번호 입력 */}
        <label className="block text-sm font-medium text-gray-700">
          새 비밀번호
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange} // ✅ 실시간 반영
          className="w-full p-2 border rounded-md mb-2 text-black"
          placeholder="새 비밀번호 입력"
        />

        {/* 새 비밀번호 확인 입력 */}
        <label className="block text-sm font-medium text-gray-700">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange} // ✅ 실시간 반영
          className="w-full p-2 border rounded-md mb-2 text-black"
          placeholder="새 비밀번호 확인"
        />

        {/* 메시지 출력 (비밀번호 불일치 등) */}
        {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

        {/* 버튼 영역 */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
