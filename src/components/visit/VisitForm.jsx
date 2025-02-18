import React, { useState } from "react";
import InputField from "../form/InputField";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";

const VisitForm = () => {
  //일단 guardId를 1로 설정
  const guardId = 1;

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    visDate: "",
    visTime: "",
    visTp: "",
    visRelation: "",
    visCnt: 0,
    visApply: "pending",
    visYn: false,
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 메소드 초기화
    try {
      const response = await api.post(`/visit/create/${guardId}`, formData);
      console.log("Response", response.data);
    } catch (error) {
      console.error(error);
      setError("예약 생성 중 오류 발생");
    }
  };

  return (
    <div>
      {error && <ErrorMessage error={error} />}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <InputField
            label="방문 날짜"
            type="date"
            name="visDate"
            value={formData.visDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <InputField
            label="방문 시간"
            type="time"
            name="visTime"
            value={formData.visTime}
            onChange={handleChange}
            required
            min="09:00"
            max="18:00"
            step="1800" //30분 단위로 설정
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">방문 유형</label>
          <select
            name="visTp"
            value={formData.visTp}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">선택하세요</option>
            <option value="visit">직접 방문</option>
            <option value="face">영상 통화</option>
          </select>
        </div>
        <div className="mb-4">
          <InputField
            label="관계"
            type="text"
            name="visRelation"
            value={formData.visRelation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <InputField
            label="인원수"
            type="number"
            name="visCnt"
            value={formData.visCnt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <InputField
            label="비고"
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          예약 생성
        </button>
      </form>
    </div>
  );
};

export default VisitForm;
