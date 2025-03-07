import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CompositionTable from "./CompositionTable"; // 테이블 컴포넌트 가져오기

const CompositionListForGiver = () => {
  const [compositions, setCompositions] = useState([]);
  const [error, setError] = useState("");
  // 필터 상태 추가
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterField, setFilterField] = useState(""); // 선택 필드
  const [filterValue, setFilterValue] = useState(""); // 숫자 필터 값

  // 필터링 된 목록 반환하기
  const filteredCompositions = compositions.filter((composition) => {
    const matchesName =
      filterName === "" || composition.comResName?.includes(filterName);

    const matchesDate =
      filterDate === "" ||
      (composition.comDate && composition.comDate === filterDate);

    let matchesNumber = true;
    if (filterField && filterValue !== "") {
      const fieldValue = parseFloat(composition[filterField]); // 선택한 필드 값 가져오기
      const inputNumber = parseFloat(filterValue);
      if (!isNaN(fieldValue) && !isNaN(inputNumber)) {
        matchesNumber = fieldValue >= inputNumber; // 입력한 값보다 큰 경우만 필터링
      }
    }

    return matchesName && matchesDate && matchesNumber;
  });

  //시작할 때 한 번만 데이터 불러옴
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

  // 삭제 후 상태 업데이트 함수 추가
  const handleDeleteComposition = (comId) => {
    setCompositions((prevCompositions) =>
      prevCompositions.filter((item) => item.comId !== comId)
    );
    console.log(`삭제 완료: ${comId}`);
  };

  // 수정시 반영
  const handleUpdateComposition = (updatedComposition) => {
    setCompositions((prevCompositions) =>
      prevCompositions.map((comp) =>
        comp.comId === updatedComposition.comId ? updatedComposition : comp
      )
    );
  };

  const resetFilters = () => {
    setFilterName("");
    setFilterDate("");
    setFilterField("");
    setFilterValue("");
  };

  return (
    <>
      {/* 필터 입력창 및 초기화 버튼 */}
      <div className="flex justify-center space-x-2 items-center">
        <input
          type="text"
          placeholder="예시) 김철순"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="px-3 py-1 border m-2 border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-3 py-1 border m-2 border-gray-300 rounded-md"
        />

        {/* 선택할 필드 드롭다운 */}
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="px-3 py-1 border m-2 border-gray-300 rounded-md"
        >
          <option value="">-- 필터 선택 --</option>
          <option value="comHeight">신장 (cm)</option>
          <option value="comWeight">체중 (kg)</option>
          <option value="comSmm">골격근량 (kg)</option>
          <option value="comBfm">체지방량 (kg)</option>
          <option value="comPbf">체지방률 (%)</option>
          <option value="comBmi">BMI</option>
          <option value="comFatLvl">내장지방레벨</option>
        </select>

        {/* 필터 숫자 입력 */}
        <input
          type="number"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="입력값 이상 검색"
          className="px-3 py-1 border m-2 border-gray-300 rounded-md"
          disabled={!filterField} // 필드 선택 없을 때 비활성화
        />

        <button
          onClick={resetFilters}
          className="px-3 py-1 h-[40px] w-[120px] bg-violet-500 text-m text-white rounded-md hover:bg-violet-700"
        >
          필터 초기화
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <CompositionTable
        compositions={filteredCompositions}
        showActions={true}
        onDelete={handleDeleteComposition}
        onUpdate={handleUpdateComposition} // 수정 반영
      />
    </>
  );
};

export default CompositionListForGiver;
