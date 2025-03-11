import React, { useState } from "react";
import VisitUpdateModal from "./VisitUpdateModal";
import api from "../../services/api";

const VisitItem = ({ visit, onUpdate }) => {
  //컨텍스트 Path에서 유저 정보 받아오기.

  // 토글을 위한 수정 모드 셋팅
  const [showModal, setShowModal] = useState(false);

  // 모달 열기/닫기 핸들러
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //삭제하기
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/visit/delete/${visit.visId}`);
      // 삭제후 작업 수행 기능 들어갈 자리
      window.location.reload();
      console.log("삭제 성공:", response.data);
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
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

  // 예약 상태에 따라 표시되는 색상
  const applyColor =
    visApply === "permited"
      ? "text-green-600"
      : visApply === "rejected"
      ? "text-red-600"
      : "text-yellow-500";

  // 예약 상태에 따라 표시할 텍스트를 구분
  const applyText =
    visApply === "permited"
      ? "승인"
      : visApply === "rejected"
      ? "거절"
      : "대기";

  //방문 여부에 따른 표시 텍스트 구분
  const vistedText = visYn ? "방문" : "미방문";

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md w-[600px]">
          {/* 예약 유형 헤더 */}
          <h2 className="text-xl font-bold mb-2">
            {visTp === "visit" ? "방문 예약" : "영상통화 예약"}
          </h2>

          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">항목</th>
                <th className="px-4 py-2 text-left font-semibold">내용</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 font-semibold">예약 일자</td>
                <td className="px-4 py-2">{visit.visDate}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">예약 시간</td>
                <td className="px-4 py-2">{visit.visTime}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">관계</td>
                <td className="px-4 py-2">{visit.visRelation}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">방문자 수</td>
                <td className="px-4 py-2">{visit.visCnt}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">방문 여부</td>
                <td className="px-4 py-2">{vistedText}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">비고</td>
                <td className="px-4 py-2">{visit.remark}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">환자 이름</td>
                <td className="px-4 py-2">{visit.resName}</td>
              </tr>
            </tbody>
          </table>

          {/* 승인 상태 */}
          <p className={`text-gray-700 ${applyColor}`}>
            <span className="font-semibold">승인 상태: </span> {applyText}
          </p>

          {/* 수정 하기 */}
          <button
            onClick={openModal}
            type="button"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            수정
          </button>

          {/* 삭제 하기 */}
          <button
            onClick={handleDelete}
            className="mt-2 m-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            삭제
          </button>
        </div>
      </div>

      {/* EditVisitForm은 VisitItem의 정보 컨테이너 아래에 표시됨 */}

      <div className="mt-4">
        <VisitUpdateModal
          show={showModal}
          onClose={closeModal}
          visit={visit}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
};

export default VisitItem;
