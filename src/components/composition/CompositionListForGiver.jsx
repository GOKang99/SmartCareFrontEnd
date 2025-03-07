import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CompositionTable from "./CompositionTable"; // 테이블 컴포넌트 가져오기

const CompositionListForGiver = () => {
  const [compositions, setCompositions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCompositions = async () => {
      try {
        const response = await api.get("/composition/all");
        console.log(response);
        setCompositions(response.data);
      } catch (error) {
        console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllCompositions();
  }, []);

  //삭제 후 상태 업데이트 함수 추가
  const handleDeleteComposition = (comId) => {
    setCompositions((prevCompositions) =>
      prevCompositions.filter((item) => item.comId !== comId)
    );
    console.log(`삭제 완료: ${comId}`);
  };

  //수정시 반영
  const handleUpdateComposition = (updatedComposition) => {
    setCompositions((prevCompositions) =>
      prevCompositions.map((comp) =>
        comp.comId === updatedComposition.comId ? updatedComposition : comp
      )
    );
  };
  return (
    <>
      <h1 className="text-6xl flex justify-center items-center">
        요양보호사 페이지
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      <CompositionTable
        compositions={compositions}
        showActions={true}
        onDelete={handleDeleteComposition}
        onUpdate={handleUpdateComposition} // 수정 반영
      />
    </>
  );
};

export default CompositionListForGiver;
