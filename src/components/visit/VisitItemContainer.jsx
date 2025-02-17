import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import axios from "axios";

const VisitItemContainer = () => {
  const [visitData, setVisitData] = useState(null);
  const [error, setError] = useState("");
  const [visId, setVisId] = useState(3);
  const [guardId, setGuardId] = useState(1);

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/visit/${visId}/guard/${guardId}`
        );
        setVisitData(response.data);
      } catch (err) {
        console.error(err);
        setError("데이터 불러오기 중 오류 발생");
      }
    };
    fetchVisit();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      {visitData ? <VisitItem visit={visitData} /> : <p> 데이터 없음</p>}
    </div>
  );
};

export default VisitItemContainer;
