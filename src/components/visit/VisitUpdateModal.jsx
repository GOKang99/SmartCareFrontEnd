import React from "react";
import EditVisitForm from "./EditVisitForm";

const VisitUpdateModal = ({ visit, show, onClose, onUpdate }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 id="modal-title" className="text-xl font-bold mb-4">
          예약 수정
        </h3>
        <EditVisitForm visit={visit} onClose={onClose} onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default VisitUpdateModal;
