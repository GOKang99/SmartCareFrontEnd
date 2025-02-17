import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import api from "../../services/api";

const VisitList = () => {
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await api.get("/visit/all");
        console.log(response);
        setVisits(response.data);
      } catch (error) {
        console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllVisits();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {visits.length > 0 ? (
        visits.map((visit) => <VisitItem key={visit.visId} visit={visit} />)
      ) : (
        <p>예약 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default VisitList;
