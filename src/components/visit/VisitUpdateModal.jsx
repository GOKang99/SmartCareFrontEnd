import React from "react";
import EditVisitForm from "./EditVisitForm";

const VisitUpdateModal = ({ visit, show, onClose, onUpdateSuccess }) => {
  if (!show) return null;

  return (
    <div>
      {/* 모달 창 헤더 부분 */}
      <div>
        <h3 id="modal-title" className="font-bold text-gray-800">
          예약 수정
        </h3>
      </div>

      {/* 모달 창 내용 */}
      <div>
        <EditVisitForm
          visit={visit}
          onClose={onClose}
          onUpdateSuccess={onUpdateSuccess}
        />
      </div>
      {/* 모달 창 닫기 버튼  */}
    </div>
  );
};

export default VisitUpdateModal;
