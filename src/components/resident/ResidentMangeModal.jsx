import React from "react";
import { Link } from "react-router-dom";

const ResidentManagementModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center  bg-opacity-50">
      <div className="bg-white w-[200px] h-[200px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
        <h2 className="text-center text-lg font-semibold">입소자 관리</h2>

        <div className="flex flex-col space-y-2">
          <Link to="/composition/form">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md w-full">
              체성분 분석 등록
            </button>
          </Link>
          <Link to="/composition/admin">
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md w-full">
              체성분 분석 보기
            </button>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default ResidentManagementModal;
