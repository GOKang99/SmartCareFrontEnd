import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Mypage = () => {
  const { id } = useParams(); // URL에서 user id를 가져온다고 가정(/mypage/1)
  const [userData, setUserData] = useState(null); // 백엔드에서 받은 유저 정보

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  // userData의 필드 (예시)
  // userData.username, userData.phone, userData.roleName, userData.residentName, userData.residentImage 등

  // 역할(Role)에 따라 구분
  const isAdmin = userData.roleName === "ROLE_ADMIN";
  const isUser = userData.roleName === "ROLE_USER";

  // 환자 이미지 표시 (없으면 기본 이미지)
  const residentImage =
    userData.residentImage || "https://via.placeholder.com/150";

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {/* 프로필 사진 (보호자가 아니라면 그냥 유저의 무언가 표시하거나 생략) */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-sm">사진</span>
          </div>
          <h2 className="text-xl font-semibold">
            {/* 보호자(ROLE_USER)면 '입소자 성함' 대신 "내 정보"를 표시할 수도 있고, 원하는 대로 조정 */}
            {userData.username} {/* ex) 홍길동 */}
          </h2>
        </div>

        {/* 정보 섹션 */}
        <div className="mt-6 space-y-4">
          {/* 보호자 성함 */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">
              {/* role이 USER라면: "보호자 성함", role이 ADMIN이면: "관리자 이름" 등등 */}
              {isUser ? "보호자 성함" : "관리자 이름"} : {userData.username}
            </span>
          </div>

          {/* 보호자 연락처 (관리자라도 전화번호가 있으면 표시할 수 있음) */}
          <div className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">연락처 : {userData.phone}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              (⁕ 응급 상황 발생 시 연락받으실 연락처)
            </p>
          </div>
        </div>

        {/* 보호자가 관리하는 환자 정보 (ROLE_USER일 때만 표시) */}
        {isUser && userData.residentName && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">입소자 정보</h3>
            <div className="flex flex-col items-center">
              <img
                src={residentImage}
                alt="Resident"
                className="w-24 h-24 bg-gray-300 rounded-full mb-4 object-cover"
              />
              <p className="text-xl">{userData.residentName}</p>
            </div>
          </div>
        )}

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
