import React, { useState } from "react";
import { useMyContext } from "../../ContextApi";
import api from "../../services/api";

const EditCompositionForm = ({ composition, closeModal, onUpdate }) => {
  const { giverId } = useMyContext();

  console.log("EditForm에서 가지고 온 ", giverId);

  const [formData, setFormData] = useState({
    comDate: composition?.comDate || "",
    comHeight: composition?.comHeight || "",
    comWeight: composition?.comWeight || "",
    comSmm: composition?.comSmm || "",
    comBfm: composition?.comBfm || "",
    comPbf: composition?.comPbf || "",
    comBmi: composition?.comBmi || "",
    comFatLvl: composition?.comFatLvl || "",
    updatedBy: giverId || "", // 수정하는 요양사 ID
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 수정 데이터 서버로 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("수정 요청 데이터:", formData);

    try {
      const response = await api.put(
        `/composition/update/${composition.comId}/${formData.updatedBy}`,
        formData
      );
      alert("수정 완료!");
      onUpdate(response.data);
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("수정 중 오류 발생", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2">체성분 분석 수정</h1>
      <p className="text-sm text-gray-600 mb-4">필요한 값을 수정하세요.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "검사 날짜", name: "comDate", type: "date" },
          { label: "키 (cm)", name: "comHeight", type: "number" },
          { label: "몸무게 (kg)", name: "comWeight", type: "number" },
          { label: "골격근량", name: "comSmm", type: "number" },
          { label: "체지방량", name: "comBfm", type: "number" },
          { label: "체지방률 (%)", name: "comPbf", type: "number" },
          { label: "BMI", name: "comBmi", type: "number" },
          { label: "내장지방 레벨", name: "comFatLvl", type: "number" },
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
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompositionForm;
