import React from "react";

const Mypage = () => {
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-sm">사진</span>
          </div>
          <h2 className="text-xl font-semibold">입소자 성함</h2>
        </div>

        {/* 정보 섹션 */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">보호자 성함 : 홍길동</span>
          </div>
          <div className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">보호자 연락처 : 010-1234-5678</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              (⁕ 응급 상황 발생 시 연락받으실 연락처)
            </p>
          </div>
        </div>

        {/* 비밀번호 변경 버튼 */}
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            비밀번호 변경
          </button>
        </div>
      </div>
    </>
  );
};

export default Mypage;
