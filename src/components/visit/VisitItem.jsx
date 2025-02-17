import React from "react";

const VisitItem = ({ visit }) => {
  if (!visit) {
    return <p className="text-red-500">데이터가 없습니다.</p>;
  }
  // visit 객체에서 추출
  const { visApply, visTp, visDate, visTime, visRelation, visCnt, visYn } =
    visit;

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
      ? "승인됨"
      : visApply === "rejected"
      ? "거절됨"
      : "대기중";

  //방문 여부에 따른 표시 텍스트 구분
  const vistedText = visYn ? "방문" : "미방문";

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* 예약 유형 헤더 */}
      <h2 className="text-xl font-bold mb-2">
        {visTp === "visit" ? "방문 예약" : "영상통화 예약"}
      </h2>

      {/* 예약 일자 */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">예약 일자: </span>
        {visDate}
      </p>
      {/* 예약 시간 */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">예약 시간: </span>
        {visTime}
      </p>

      {/* 환자와의 관계 */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">관계: </span>
        {visRelation}
      </p>
      {/* 방문자 수 */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">방문자 수: </span>
        {visCnt}
      </p>
      {/* 방문 여부  */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">방문 여부: </span>
        {vistedText}
      </p>

      {/* 승인 상태 */}
      <p className={`text-gray-700 ${applyColor}`}>
        <span className="font-semibold">승인 상태: </span>
        {applyText}
      </p>
    </div>
  );
};

export default VisitItem;
