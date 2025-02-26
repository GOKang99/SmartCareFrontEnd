import React, { useState } from "react";
import InputField from "../form/InputField";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import TimePicker from "./TimePicker";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../ContextApi";

const VisitForm = () => {
  const navigate = useNavigate();

  const { guardId } = useMyContext();

  //기본 값 설정 useState
  //  기본값 09:00 설정
  const [selectedTime, setSelectedTime] = useState({
    value: "09:00",
    label: "09:00",
  });

  const [error, setError] = useState("");

  //오늘 날짜 가져오기
  const today = new Date().toISOString().split("T")[0];

  //폼 useState
  const [formData, setFormData] = useState({
    visDate: today,
    visTime: "",
    visTp: "visit",
    visRelation: "",
    visCnt: 1,
    visApply: "pending",
    visYn: false,
    remark: "",
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

  const handleSubmit = async (e) => {
    // 기본 제출 메소드 초기화
    e.preventDefault();

    // visTime변환 메서드
    //value가 있다면 value반환 없다면 빈 문자열
    formData.visTime = selectedTime?.value || "";

    console.log("서버로 보낼 데이터", formData);

    try {
      const response = await api.post(`/visit/create/${guardId}`, formData);
      console.log("Response", response.data);
      alert(`${formData.visDate}일 ${formData.visTime}에 예약 완료`);
      //내 예약으로 이동
      navigate("/visits/my");
    } catch (error) {
      console.error(error);
      setError("예약 생성 중 오류 발생");
    }
  };

  return (
    <div>
      {/* 에러 창 */}
      {error && <ErrorMessage error={error} />}
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md w-[500px]"
      >
        {/* 방문 날짜 선택 */}
        <div className="mb-4">
          <InputField
            label="방문 날짜"
            type="date"
            name="visDate"
            value={formData.visDate}
            onChange={handleChange}
            required
            min={today}
          />
        </div>
        {/* 방문예약 시간 설정 */}
        <div className="mb-4">
          <label className="block mb-1">방문 시간</label>
          <TimePicker
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
          />
        </div>
        {/* 직접방문 or 영상통화 */}
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
        {/* 환자와의 관계 */}
        <div className="mb-4">
          <InputField
            label="환자와의 관계"
            type="text"
            name="visRelation"
            value={formData.visRelation}
            onChange={handleChange}
            required
            placeholder="예:가족,친구,지인"
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
            min={1}
            max={10}
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
