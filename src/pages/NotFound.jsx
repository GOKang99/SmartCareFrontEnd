import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md text-center md:text-left">
          <div className="text-7xl font-bold">404</div>
          <p className="text-3xl md:text-3xl font-light leading-normal mt-4">
            페이지가 없습니다.
          </p>
          <p className="text-xl mb-8 mt-2">
            아래의 버튼을 눌러 홈페이지로 이동하세요.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium leading-5 shadow text-white transition duration-150 border border-transparent rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-blue-600 hover:bg-blue-700"
          >
            홈페이지로 돌아가기
          </button>
        </div>
        <div className="max-w-lg mt-8 md:mt-0 md:ml-8">
          <img
            src="/notfound.png"
            alt="페이지를 찾을 수 없음"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
