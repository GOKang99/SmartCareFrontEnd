import React, { useState } from "react";
import CistDetailModal from "./CistDetailModal";

const CistTable = ({ data }) => {
    const [selectedCistId, setSelectedCistId] = useState(null);

    // 날짜 형변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    };

    // 선택된 행의 데이터 찾기
    const selectedCist = data.find((cist) => cist.cisId === selectedCistId);

    // 등급에 따른 배지 색상 반환
    const getGradeBadgeColor = (grade) => {
        switch(grade) {
            case 'A': return "bg-green-100 text-green-800";
            case 'B': return "bg-blue-100 text-blue-800";
            case 'C': return "bg-yellow-100 text-yellow-800";
            case 'D': return "bg-orange-100 text-orange-800";
            case 'F': return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    // 테이블 데이터가 없는 경우 표시할 내용
    if (data.length === 0) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 mt-6 flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p className="text-xl font-medium text-gray-600 mb-2">표시할 데이터가 없습니다</p>
                <p className="text-gray-500">새로운 검사 결과가 추가되면 여기에 표시됩니다</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">인지 기능 검사 결과</h2>
                <p className="text-sm text-gray-500">총 {data.length}개의 검사 기록</p>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검사 날짜</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총점</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판정</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상세</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((cist, index) => (
                            <tr 
                                key={cist.cisId} 
                                className={`transition-colors hover:bg-gray-50 ${
                                    selectedCistId === cist.cisId ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{cist.resName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{formatDate(cist.cisDt)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {cist.totalScore}
                                        <span className="text-gray-500 text-xs ml-1">/30</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeBadgeColor(cist.cisGrade)}`}>
                                        {cist.cisGrade}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => setSelectedCistId(cist.cisId)}
                                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${
                                            selectedCistId === cist.cisId 
                                                ? "bg-indigo-600 hover:bg-indigo-700" 
                                                : "bg-blue-600 hover:bg-blue-700"
                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        {selectedCistId === cist.cisId ? "확인 중" : "상세 보기"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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