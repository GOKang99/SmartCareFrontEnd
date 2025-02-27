import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import VisitItem from "./VisitItem";
import NoVisitsMessage from "./NoVisitsMessage";
import { useMyContext } from "../../ContextApi";

const VisitLisitForGuard = () => {
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");

  //guardId ContextPath에서 받아오기
  const { guardId } = useMyContext();

  console.log(guardId);

  // 보호자 예약 데이터 불러오기
  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await api.get(`/visit/all/${guardId}`);
        setVisits(response.data);
      } catch (error) {
        console.error(error);
        setError(guardId + "의 예약 데이터 불러오기 실패");
      }
    };
    const timeoutId = setTimeout(() => {
      fetchAllVisits();
    }, 100); // 1초 (1000ms)

    return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타이머 정리
  }, [guardId]); // guardId가 변경될 때마다 실행되도록 의존성 배열에 추가

  const handleVisitUpdate = (updatedVisit) => {
    setVisits((prevVisits) =>
      prevVisits.map((visit) =>
        visit.visId === updatedVisit.visId ? updatedVisit : visit
      )
    );
  };
  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {error && <ErrorMessage error={error} />}
      {visits.length > 0 ? (
        visits.map((visit) => (
          <VisitItem
            key={visit.visId}
            visit={visit}
            onUpdate={handleVisitUpdate}
          />
        ))
      ) : (
        <NoVisitsMessage />
      )}
    </div>
  );
};

export default VisitLisitForGuard;
