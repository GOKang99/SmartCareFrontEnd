import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordChangeModal from "./PasswordChangeModal";
import { jwtDecode } from "jwt-decode";
import { useMyContext } from "../ContextApi";
import api from "../services/api";
import { toast } from "react-toastify";
import UserExitModal from "./UserExitModal";

const Mypage = () => {
  const { token, setToken, setCurrentUser, setIsAdmin, setDeToken } =
    useMyContext(); //컨텍스트에서 id 받아오기
  const { id } = useParams(); // URL에서 user id를 가져온다고 가정(/mypage/1)
  const [userData, setUserData] = useState(null); // 백엔드에서 받은 유저 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [ExitModalOpen, setExitModalOpen] = useState(false); // 회원탈퇴 모달 상태 관리
  const navigate = useNavigate(); //이동객체
  let dToken = null; //변경가능한 변수로 비어있는 해독된 토큰의 공간을 정의

  //로그아웃함수
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
    toast.success("로그아웃 되었습니다");
  };

  if (token) {
    try {
      dToken = jwtDecode(token);
    } catch (error) {
      console.error("토큰 해독 중 오류 발생:", error);
    }
  } else {
    console.warn("토큰이 없습니다.");
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get(`/users/${dToken.userId}`);
        setUserData(data);
        console.log("유저데이터", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  // 역할(Role)에 따라 구분
  const isAd = userData.roleName === "ROLE_ADMIN";
  const isUser = userData.roleName === "ROLE_USER";

  // 환자 이미지 표시 (없으면 기본 이미지)
  const residentImage = `http://localhost:8080/userimage/${userData.userimage}`;
  // isUser && userData.residentImage
  //   ? userData.residentImage
  //   : "https://picsum.photos/200";

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
              <p className="text-sm">성함: {userData.realname}</p>
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
            onClick={() => handleLogout()}
          >
            <p className="text-gray-700 flex-1">로그아웃</p>
            <span className="text-gray-400">&gt;</span>
          </div>
          {/* 회원탈퇴 */}
          <div
            className="py-3 px-4 flex items-center border-b border-gray-200 cursor-pointer"
            onClick={() => setExitModalOpen(true)} // 버튼 클릭 시 모달 열기
          >
            <p className="text-gray-700 flex-1">회원탈퇴</p>
            <span className="text-gray-400">&gt;</span>
          </div>
          <UserExitModal
            isOpen={ExitModalOpen} // 모달 상태 전달
            onClose={() => setExitModalOpen(false)} //닫기 버튼 클릭 시 모달 닫기
          />
        </div>
      </div>
    </>
  );
};

export default Mypage;
