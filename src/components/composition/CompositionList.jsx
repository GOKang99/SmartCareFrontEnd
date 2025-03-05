import React, { useEffect, useState } from "react";
import { useMyContext } from "../../ContextApi";
import api from "../../services/api";
import CompositionTable from "./CompositionTable";
import CompositionGraphs from "./CompositionGraphs";

const CompositionList = () => {
  const [compositions, setCompositions] = useState([]);
  const [resId, setResId] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const { userData } = useMyContext();

  useEffect(() => {
    if (userData && userData.residentId) {
      if (resId !== userData.residentId) {
        setResId(userData.residentId);
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchAllCompositions = async () => {
      if (!resId) return;

      try {
        const response = await api.get(`/composition/all/${resId}`);
        setCompositions(response.data);

        if (!response.data || response.data.length === 0) {
          setError("조회된 체성분 데이터가 없습니다.");
        } else {
          setError("");
        }
      } catch (error) {
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllCompositions();
  }, [resId]);

  return (
    <>
      <h1 className="text-4xl flex justify-center items-center">
        {compositions.length > 0
          ? compositions[0].comResName
          : "환자 이름 없음"}
        님 체성분 분석
      </h1>
      <div className="flex justify-center my-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          그래프로 확인하기
        </button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {compositions.length > 0 ? (
        <>
          <CompositionTable compositions={compositions} />
        </>
      ) : (
        !error && (
          <p className="text-gray-500 text-center">데이터를 불러오는 중...</p>
        )
      )}

      {/* 모달 추가 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="float-right bg-red-500 text-white px-3 py-1 rounded"
            >
              닫기
            </button>
            <h2 className="text-2xl text-center mb-4">체성분 그래프</h2>
            <CompositionGraphs compositions={compositions} />
          </div>
        </div>
      )}
    </>
  );
};

export default CompositionList;
