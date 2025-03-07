import React, { useState } from "react";
import CompositionForm from "../composition/CompositionForm";

const ResidentManagementModal = ({ onClose, resident }) => {
  const [showCompositionForm, setShowCompositionForm] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      {/* 모달창이 안켜져있을 때 */}
      {!showCompositionForm ? (
        <div className="bg-white w-[200px] h-auto p-4 rounded-lg shadow-lg flex flex-col">
          <h2 className="text-center text-lg font-semibold">입소자 관리</h2>
          <div className="flex flex-col space-y-2 mt-2">
            <button
              onClick={() => setShowCompositionForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md w-full"
            >
              체성분 분석 등록
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md w-full">
              체성분 분석 보기
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md w-full"
          >
            닫기
          </button>
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
