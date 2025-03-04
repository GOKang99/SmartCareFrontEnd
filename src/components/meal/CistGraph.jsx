import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CistGraph = ({ data }) => {
    //날짜 형식을 "월,일"로 변환하기
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
        const day = String(dateObj.getDate()).padStart(2, "0"); // 일
        return `${month}.${day}`; //"월,일" 형식으로 변환
    };

    //날짜 기준으로 오름차순
    const sortedDate = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">지난 1년간 검사정보</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sortedDate} className="">
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate} // X축 날짜 형식 지정1
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend/>
                    <Line type="monotone" dataKey="totalScore" stroke="#8884d8" name="총점" />
                    <Line type="monotone" dataKey="orientation" stroke="#82ca9d" name="지남력" />
                    <Line type="monotone" dataKey="attention" stroke="#ff7300" name="주의력" />
                    <Line type="monotone" dataKey="spatialTemporal" stroke="#ff0000" name="시공간능력" />
                    <Line type="monotone" dataKey="executiveFunction" stroke="#00C49F" name="집행기능" />
                    <Line type="monotone" dataKey="memory" stroke="#FFBB28" name="기억력" />
                    <Line type="monotone" dataKey="language" stroke="#0088FE" name="언어기능" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CistGraph;