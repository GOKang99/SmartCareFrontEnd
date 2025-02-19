import React, { useState } from "react";
import InputField from "../form/InputField";
import TimePicker from "./TimePicker";
import api from "../../services/api";

const EditVisitForm = ({ visit, onClose }) => {
  //  기본값 09:00 설정
  const [selectedTime, setSelectedTime] = useState({
    value: "09:00",
    label: "09:00",
  });

  const [formData, setFormData] = useState({
    visDate: visit.visDate,
    visTime: visit.visTime,
    visTp: visit.visTp,
    visRelation: visit.visRelation,
    visCnt: visit.visCnt,
    remark: visit.remark,
    visApply: visit.visApply,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.visTime = selectedTime?.value || "";
    console.log(formData);
    try {
      const response = await api.put(`/visit/update/${visit.visId}`, formData);
      onUpdateSuccess(response.data);
    } catch (err) {
      setError("예약 업데이트 중 오류 발생");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <div>
          <label>방문 유형</label>
          <select
            name="visTp"
            value={formData.visTp}
            onChange={handleChange}
            required
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
