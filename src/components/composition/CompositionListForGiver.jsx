import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CompositionTable from "./CompositionTable"; // 테이블 컴포넌트 가져오기

const CompositionListForGiver = () => {
  const [compositions, setCompositions] = useState([]);
  const [error, setError] = useState("");
  const [resId, setResId] = useState(2);

  useEffect(() => {
    const fetchAllCompositions = async () => {
      try {
        const response = await api.get(`/composition/all/${resId}`);
        console.log(response);
        setCompositions(response.data);
      } catch (error) {
        console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllCompositions();
  }, [resId]);

  // 입력값 변경 시 resId 업데이트
  const handleChange = (event) => {
    const value = event.target.value;
    setResId(value ? parseInt(value, 10) : ""); // 숫자로 변환, 빈 값 처리
  };

  return (
    <>
      <h1 className="text-6xl flex justify-center items-center">
        요양보호사 페이지
      </h1>
      <div className="flex justify-center items-center p-3">
        <input
          type="text"
          placeholder="환자 번호를 입력하세요"
          value={resId}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CompositionTable compositions={compositions} showActions={true} />
    </>
  );
};

export default CompositionListForGiver;
