import React, { useState } from "react";
import CompositionForm from "../composition/CompositionForm";
import { useNavigate } from "react-router-dom";

const ResidentManagementModal = ({ onClose, resident }) => {
  const [showCompositionForm, setShowCompositionForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      {/* 모달창이 안켜져있을 때 */}
      {!showCompositionForm ? (
        <div className="bg-white w-[200px] h-auto p-4 rounded-lg shadow-lg flex flex-col border border-black">
          <h2 className="text-center text-lg font-semibold mb-3">
            입소자 관리
          </h2>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowCompositionForm(true)}
              className="bg-white hover:bg-gray-100 text-black border border-green-700 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm"
            >
              체성분 분석 등록
            </button>
            <button
              className="bg-white hover:bg-gray-100 text-black border border-blue-700 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm"
              onClick={() => navigate("/composition/admin")}
            >
              체성분 분석 보기
            </button>
            <button
              className="bg-white hover:bg-gray-100 text-black border border-red-600 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      ) : (
        // CompositionForm을 800px 크기로 별도 배치
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-[800px] p-6 rounded-lg shadow-lg">
            <CompositionForm resident={resident} />
            <button
              onClick={() => setShowCompositionForm(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentManagementModal;
