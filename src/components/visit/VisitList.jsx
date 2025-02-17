import React from "react";
import { mockVisits } from "./mockData";
import VisitItem from "./VisitItem";

const VisitList = () => {
  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {mockVisits.map((visit) => (
        <VisitItem key={visit.visId} visit={visit} />
      ))}
    </div>
  );
};

export default VisitList;
