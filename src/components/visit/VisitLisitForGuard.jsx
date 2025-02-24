import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import VisitItem from "./VisitItem";
import NoVisitsMessage from "./NoVisitsMessage";

const VisitLisitForGuard = ({ guardId }) => {
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");

  //guardId ContextPath에서 받아오기

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
    fetchAllVisits();
  }, []);

  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {error && <ErrorMessage error={error} />}
      {visits.length > 0 ? (
        visits.map((visit) => <VisitItem key={visit.visId} visit={visit} />)
      ) : (
        <NoVisitsMessage />
      )}
    </div>
  );
};

export default VisitLisitForGuard;
