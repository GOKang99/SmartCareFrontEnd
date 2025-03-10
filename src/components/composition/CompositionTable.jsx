import React, { useState } from "react";
import api from "../../services/api";
import EditCompositionForm from "./EditCompositionForm";

const CompositionTable = ({
  compositions,
  showActions = false,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComposition, setSelectedComposition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 10개 항목 표시

  // 총 페이지 수 계산
  const totalPages = Math.ceil(compositions.length / itemsPerPage);

  // 현재 페이지 데이터 가져오기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = compositions.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 개별 항목 삭제 함수
  const handleDelete = async (comId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return; // 삭제 확인
    try {
      await api.delete(`/composition/delete/${comId}`);
      console.log("삭제 성공:", comId);
      onDelete(comId); // 부모 컴포넌트에서 상태 업데이트
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
    }
  };

  // 수정 버튼 클릭 시 선택된 Composition 설정 및 모달 열기
  const handleEdit = (composition) => {
    setSelectedComposition(composition);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 text-center">
      <table className="w-300 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">이름</th>
            <th className="border border-gray-300 px-4 py-2">검사일자</th>
            <th className="border border-gray-300 px-4 py-2">신장 (cm)</th>
            <th className="border border-gray-300 px-4 py-2">체중 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">골격근량 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">체지방량 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">체지방률 (%)</th>
            <th className="border border-gray-300 px-4 py-2">BMI</th>
            <th className="border border-gray-300 px-4 py-2">내장지방레벨</th>
            {showActions && (
              <>
                <th className="border border-gray-300 px-4 py-2">수정</th>
                <th className="border border-gray-300 px-4 py-2">삭제</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.comId} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {item.comResName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comHeight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comWeight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comSmm}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comBfm}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comPbf}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comBmi}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comFatLvl}
              </td>
              {showActions && (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
                      onClick={() => handleEdit(item)}
                    >
                      수정
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer  hover:bg-red-700"
                      onClick={() => handleDelete(item.comId)}
                    >
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 버튼 */}
      <div className="flex mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 border ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          } `}
        >
          이전
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 border ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          다음
        </button>
      </div>

      {/* 수정 모달 */}
      {isModalOpen && selectedComposition && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="float-right bg-red-500 text-white px-3 py-1 rounded"
            >
              닫기
            </button>
            <h2 className="text-2xl text-center mb-4">체성분 수정</h2>
            <EditCompositionForm
              composition={selectedComposition}
              closeModal={() => setIsModalOpen(false)}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompositionTable;
