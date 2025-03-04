import React, { useState } from "react";
import CistDetailModal from "./CistDetailModal";

const CistTable = ({ data }) => {
    const [selectedCistId, setSelectedCistId] = useState(null);

    // 날짜 형변환1
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear(); // 연도(YYYY)
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1, 두 자리로 맞춤)
        const day = String(date.getDate()).padStart(2, "0"); // 일 (두 자리로 맞춤)
        return `${year}.${month}.${day}`; // "xxxx.xx.xx" 형식으로 반환
    };

    // 선택된 행의 데이터 찾기
    const selectedCist = data.find((cist) => cist.cisId === selectedCistId);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">이름</th>
                        <th className="border p-2">날짜</th>
                        <th className="border p-2">총점</th>
                        <th className="border p-2">판정</th>
                        <th className="border p-2">상세</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((cist) => (
                        <tr key={cist.cisId} className="text-center">
                            <td className="border p-2">{cist.resName}</td>
                            <td className="border p-2">{formatDate(cist.cisDt)}</td>
                            <td className="border p-2">{cist.totalScore}/30</td>
                            <td className="border p-2">{cist.cisGrade}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => setSelectedCistId(cist.cisId)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    {selectedCistId === cist.cisId ? "확인" : "보기"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedCist && (
                <CistDetailModal
                    cist={selectedCist}
                    onClose={() => setSelectedCistId(null)}
                />
            )}
        </div>
    );
};

export default CistTable;