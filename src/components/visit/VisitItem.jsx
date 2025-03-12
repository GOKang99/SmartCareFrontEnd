import React, { useState } from "react";
import VisitUpdateModal from "./VisitUpdateModal";
import api from "../../services/api";

const VisitItem = ({ visit, onUpdate }) => {
  // 토글을 위한 수정 모드 셋팅
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 모달 열기/닫기 핸들러
  const openModal = (vis) => {
    setSelectedVisit(vis);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedVisit(null);
    setShowModal(false);
  };
  //삭제하기

  const handleDelete = async (visId) => {
    try {
      const response = await api.delete(`/visit/delete/${visId}`);
      window.location.reload();
      console.log("삭제 성공:", response.data);
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
    }
  };

  if (!visit) {
    return <p className="text-red-500">데이터가 없습니다.</p>;
  }
  // visit 객체에서 추출
  const {
    visApply, //승인
    visTp, //방문 or 영상통화
    visDate, //방문 날짜
    visTime, //방문시간
    visRelation, //입소자와 관계
    visCnt, //방문 인원
    visYn, //방문 여부
    remark, // 비고
    resName, //환자 이름
  } = visit;

  const getApplyText = (status) => {
    switch (status) {
      case "permited":
        return <span className="text-green-600">승인</span>;
      case "rejected":
        return <span className="text-red-600">거절</span>;
      default:
        return <span className="text-yellow-500">대기</span>;
    }
  };

  //방문 여부에 따른 표시 텍스트 구분
  const vistedText = visYn ? "방문" : "미방문";

  return (
    <>
      <div className="flex flex-col justify-center items-center p-3 text-center">
        <table className="w-300 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">환자 이름</th>
              <th className="border border-gray-300 px-4 py-2">예약 일자</th>
              <th className="border border-gray-300 px-4 py-2">예약 시간</th>
              <th className="border border-gray-300 px-4 py-2">
                환자와의 관계
              </th>
              <th className="border border-gray-300 px-4 py-2">방문자 수</th>
              <th className="border border-gray-300 px-4 py-2">방문 여부</th>
              <th className="border border-gray-300 px-4 py-2">비고</th>
              <th className="border border-gray-300 px-4 py-2">승인 상태</th>
              <th className="border border-gray-300 px-4 py-2">
                방문or영상통화
              </th>
              <th className="border border-gray-300 px-4 py-2">수정</th>
              <th className="border border-gray-300 px-4 py-2">삭제</th>
            </tr>
          </thead>
          <tbody>
            {visit.map((vis) => (
              <tr key={vis.visId} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {vis.resName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visRelation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visCnt}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visYn ? "방문" : "미방문"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.remark}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {getApplyText(vis.visApply)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vis.visTp === "visit" ? "방문" : "영상통화"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openModal(vis)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    수정
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(vis.visId)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <VisitUpdateModal
          show={showModal}
          onClose={closeModal}
          visit={selectedVisit}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
};

export default VisitItem;
