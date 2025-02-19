import React, { useState } from "react";
import EditVisitForm from "./EditVisitForm";
import Test from "./test";

const VisitItem = ({ visit }) => {
  // 토글을 위한 수정 모드 셋팅
  const [isEditing, setIsEditing] = useState(false);

  // 수정하기
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  if (!visit) {
    return <p className="text-red-500">데이터가 없습니다.</p>;
  }
  // visit 객체에서 추출
  const {
    visApply,
    visTp,
    visDate,
    visTime,
    visRelation,
    visCnt,
    visYn,
    remark,
  } = visit;

  // 예약 상태에 따라 표시할 색상을 구분
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
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md w-[750px]">
        {/* 예약 유형 헤더 */}
        <h2 className="text-xl font-bold mb-2">
          {visTp === "visit" ? "방문 예약" : "영상통화 예약"}
        </h2>

        <div className="flex items-center gap-2 text-gray-700 mb-1">
          {/* 예약 일자 */}
          <span className="font-semibold">예약 일자:</span> {visDate}
          {/* 예약 시간 */}
          <span className="font-semibold">예약 시간:</span> {visTime}
          {/* 환자와의 관계 */}
          <span className="font-semibold">관계: </span> {visRelation}
          {/* 방문자 수 */}
          <span className="font-semibold">방문자 수: </span> {visCnt}
        </div>

        <div className="flex items-center gap-2 text-gray-700 mb-1">
          {/* 방문 여부  */}
          <span className="font-semibold">방문 여부: </span> {vistedText}
          {/* 비고  */}
          <span className="font-semibold">비고: </span> {remark}
        </div>

        {/* 승인 상태 */}
        <p className={`text-gray-700 ${applyColor}`}>
          <span className="font-semibold">승인 상태: </span> {applyText}
        </p>
        {/* 수정 하기 */}
        <button
          onClick={handleUpdate}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
        >
          수정
        </button>
        {/* 삭제 하기 */}
        <button
          onClick={handleUpdate}
          className="mt-2 m-1 bg-orange-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
        >
          삭제
        </button>
      </div>

      {/* EditVisitForm은 VisitItem의 정보 컨테이너 아래에 표시됨 */}
      {isEditing && (
        <div className="mt-4">
          <EditVisitForm />
        </div>
      )}
    </>
  );
};

export default VisitItem;
