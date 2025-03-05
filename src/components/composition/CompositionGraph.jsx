import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CompositionGraph = ({ data, title, color }) => {
  // 날짜 형식을 "MM.DD"로 변환
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  // 날짜 기준으로 오름차순 정렬
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-2">
      <h2 className="text-sm font-semibold mb-1">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompositionGraph;
