import React, { useEffect, useState } from "react";
import { useMyContext } from "../../ContextApi";
import api from "../../services/api";

const CompositionForm = () => {
  const { giverId } = useMyContext();
  const [formData, setFormData] = useState({
    comDate: "",
    comHeight: 175,
    comWeight: 81.9,
    comSmm: 22.7, //골격근량
    comBfm: 24.5, //체지방 량
    comPbf: 35, //체지방 률
    comBmi: 26.2,
    comFatLvl: 10,
    resId: "",
    giverId: giverId,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      giverId: giverId || prev.giverId, // giverId가 존재할 때만 업데이트
    }));
  }, [giverId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      giverId: prev.giverId, //giverId는 기존 giverId로 업데이트 하지 않음
    }));
  };
  console.log(formData);

  //제출하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("서버로 보낼 테이터:", formData);

    try {
      const response = await api.post(
        `/composition/create/${formData.resId}/${giverId}`,
        formData
      );
      alert("예약 굿");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2">입소자 체성분 분석 등록</h1>
      <p className="text-sm text-gray-600 mb-4">
        유의사항:숫자만 입력(소수점가능) Ex) 15.5
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "환자 검색하기", name: "resId", type: "text" },
          { label: "검사 날짜", name: "comDate", type: "date" },
          { label: "키 (cm)", name: "comHeight", type: "number" },
          { label: "몸무게 (kg)", name: "comWeight", type: "number" },
          { label: "골격근량", name: "comSmm", type: "number" },
          { label: "체지방량", name: "comBfm", type: "number" },
          { label: "체지방률 (%)", name: "comPbf", type: "number" },
          { label: "BMI", name: "comBmi", type: "number" },
          { label: "내장지방 레벨", name: "comFatLvl", type: "number" },
          ,
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border p-2 rounded-md text-sm"
            />
          </div>
        ))}

        <div className="flex justify-end mt-4 space-x-1">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-red-500  text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompositionForm;
