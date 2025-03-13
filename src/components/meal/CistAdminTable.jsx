import React from "react";

const CistAdminTable = ({ cists, isAdmin = false, onUpdate, onDelete }) => {
     // 요일을 한글로 변환하는 함수
    const getDayOfWeek = (date) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    return (
        <div className="overflow-x-auto">
            {cists.length === 0 ? (
                <p className="text-center">데이터가 없습니다.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-black">CIST ID</th>
                            <th className="px-4 py-2 border border-black">레지던트 이름</th>
                            <th className="px-4 py-2 border border-black">검사 날짜</th>
                            <th className="px-4 py-2 border border-black">총점</th>
                            <th className="px-4 py-2 border border-black">등급</th>
                            {isAdmin && <th className="px-4 py-2 border border-black">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {cists.map(cist => (
                            <tr key={cist.cisId} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{cist.cisId}</td>
                                <td className="px-4 py-2 border">{cist.resName}</td>
                                <td className="px-4 py-2 border">{new Date(cist.cisDt).toLocaleDateString()}({getDayOfWeek(cist.cisDt)})</td>
                                <td className="px-4 py-2 border">{cist.totalScore}</td>
                                <td className="px-4 py-2 border">{cist.cisGrade}</td>
                                {isAdmin && (
                                    <td className="px-4 py-2 border text-center font-bold">
                                        <button 
                                            onClick={() => onUpdate && onUpdate(cist.cisId)} 
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2 cursor-pointer transition-all duration-200 mr-4"
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={() => onDelete && onDelete(cist.cisId)} 
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded cursor-pointer transition-all duration-200"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CistAdminTable;