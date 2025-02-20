import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import NoVisitsMessage from "./NoVisitsMessage";

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

export default VisitList;
