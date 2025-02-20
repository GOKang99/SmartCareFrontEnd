import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PasswordChangeModal from "./PasswordChangeModal";
import { jwtDecode } from "jwt-decode";
import { useMyContext } from "../ContextApi";
import api from "../services/api";

const Mypage = () => {
  const { token } = useMyContext(); //컨텍스트에서 id 받아오기
  const { id } = useParams(); // URL에서 user id를 가져온다고 가정(/mypage/1)
  const [userData, setUserData] = useState(null); // 백엔드에서 받은 유저 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const dToken = jwtDecode(token);
  // useEffect(() => {
  //
  //   console.log("커런트", dToken.userId);
  // }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get(`/users/${dToken.userId}`);
        // console.log(data);
        setUserData(data);
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
    isUser && userData.residentImage
      ? userData.residentImage
      : "https://picsum.photos/200";

  return (
    <>
      {/* 메인 카드 컨테이너 (가운데 정렬, 그림자, 둥근모서리) */}
      <div className="max-w-md mx-auto mt-10 shadow-lg rounded-lg overflow-hidden min-h-[700px] pb-10">
        {/* 상단 바 (타이틀: 마이페이지) - 남색 배경 */}
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-lg font-semibold">마이페이지</h1>
        </div>

        {/* 상단 영역 (남색 배경) */}
        <div className="bg-blue-500 px-4 py-6 text-white">
          <div className="flex items-start justify-between">
            {/* 왼쪽: 유저(보호자) 정보 */}
            <div>
              <p className="text-sm">성함: {userData.username}</p>
              <p className="text-sm mt-1">연락처: {userData.phone}</p>
              {isUser && userData.residentName && (
                <div className="mt-2">
                  <p className="text-sm">
                    입소자 성함: {userData.residentName}
                  </p>
                </div>
              )}
            </div>

            {/* 오른쪽: 환자 사진 자리 */}
            <div>
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {/* 환자 사진: ROLE_USER이고 residentImage 있으면 사용, 아니면 기본이미지 */}
                <img
                  src={residentImage}
                  alt="환자사진"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 버튼 */}
          <div className="mt-6">
            <button
              className="mt-4 bg-white text-blue-500 px-3 py-1 rounded font-medium cursor-pointer"
              onClick={() => setIsModalOpen(true)} // 버튼 클릭 시 모달 열기
            >
              비밀번호 변경
            </button>
          </div>
          <PasswordChangeModal
            isOpen={isModalOpen} // 모달 상태 전달
            onClose={() => setIsModalOpen(false)} // 닫기 버튼 클릭 시 모달 닫기
          />
        </div>

        {/* 아래 흰색 메뉴 영역 */}
        <div className="bg-white">
          {/* 서비스 이용약관 */}
          <Link to="/agree">
            <div className="py-3 px-4 flex items-center border-b border-gray-200">
              <p className="text-gray-700 flex-1">
                서비스이용약관 및 개인정보 처리방침
              </p>
              <span className="text-gray-400">&gt;</span>
            </div>
          </Link>
          {/* 로그아웃 */}
          <div
            className="py-3 px-4 flex items-center border-b border-gray-200 cursor-pointer"
            onClick={() =>
              alert("로그아웃 되었습니다. (로그인 기능 추가 후 구현)")
            }
          >
            <p className="text-gray-700 flex-1">로그아웃</p>
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
