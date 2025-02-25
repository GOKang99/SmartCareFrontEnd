import React, { useState } from "react";
import InputField from "../form/InputField";
import TimePicker from "./TimePicker";
import api from "../../services/api";

const EditVisitForm = ({ visit, onClose, onUpdate }) => {
  //  기본값 09:00 설정
  const [selectedTime, setSelectedTime] = useState({
    value: visit.visTime,
    label: visit.visTime,
  });

  const [formData, setFormData] = useState({
    //방문 날짜
    visDate: visit.visDate,
    // 방문시간
    visTime: visit.visTime,
    //영상통화 or 방문
    visTp: visit.visTp,
    //환자와의 관계
    visRelation: visit.visRelation,
    //방문 인원
    visCnt: visit.visCnt,
    //비고
    remark: visit.remark,
    //승인 여부
    visApply: visit.visApply,
    //방문 여부
    visYn: visit.visYn,
  });

  //input창 입력시 실행되는
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(formData);
  };

  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    //selectedTime이 존재한다면! value를 셋팅 없다면 빈 문자열
    formData.visTime = selectedTime?.value || "";
    console.log(formData);
    try {
      const response = await api.put(`/visit/update/${visit.visId}`, formData);
      onUpdate(response.data);
      //모달 창 닫고 새로 고침
      onClose();
    } catch (err) {
      setError("예약 업데이트 중 오류 발생");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        {error && <p>{error}</p>}

        <div>
          <InputField
            label="방문 날짜"
            type="date"
            name="visDate"
            value={formData.visDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>방문 시간</label>
          <TimePicker
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium m-1">
            방문 유형
          </label>
          <select
            name="visTp"
            value={formData.visTp}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
            <option value="">선택하세요</option>
            <option value="visit">직접 방문</option>
            <option value="face">영상 통화</option>
          </select>
        </div>

        <div>
          <InputField
            label="환자와의 관계"
            type="text"
            name="visRelation"
            value={formData.visRelation}
            onChange={handleChange}
            required
            placeholder="예: 가족, 친구, 지인"
          />
        </div>

        <div>
          <InputField
            label="인원수"
            type="number"
            name="visCnt"
            value={formData.visCnt}
            onChange={handleChange}
            required
            min={1}
            max={10}
          />
        </div>

        <div>
          <InputField
            label="비고"
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            방문 승인
          </label>
          <select
            name="visApply"
            value={formData.visApply}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
            <option value="pending">대기</option>
            <option value="permited">허가</option>
            <option value="rejected">거절</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            방문여부
          </label>
          <select
            name="visYn"
            value={formData.visYn}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          >
            <option value="">선택하세요</option>
            <option value="true">방문</option>
            <option value="false">미방문</option>
          </select>
        </div>
        <button
          className="mt-2 m-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
          type="submit"
        >
          업데이트
        </button>

        <button
          className="mt-2 m-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
          type="button"
          onClick={onClose}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default EditVisitForm;
