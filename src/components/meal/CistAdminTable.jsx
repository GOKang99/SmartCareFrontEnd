import React from "react";

const CistAdminTable = ({ cists, isAdmin = false, onUpdate, onDelete }) => {
    // 요일을 한글로 변환하는 함수
    const getDayOfWeek = (date) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    // 등급에 따른 배지 스타일 결정
    const getGradeBadgeStyle = (grade) => {
        switch(grade) {
            case 'A':
                return "bg-green-100 text-green-800 border-green-200";
            case 'B':
                return "bg-blue-100 text-blue-800 border-blue-200";
            case 'C':
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 'D':
                return "bg-orange-100 text-orange-800 border-orange-200";
            case 'F':
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-lg font-medium">데이터가 없습니다.</p>
                    <p className="text-sm mt-2">새로운 인지 기능 평가를 추가해 주세요.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead>
                            <tr className="bg-gray-50">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CIST ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">레지던트 이름</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">검사 날짜</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">총점</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">등급</th>
                                {isAdmin && (
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cists.map((cist, index) => (
                                <tr 
                                    key={cist.cisId} 
                                    className={`transition-colors duration-150 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cist.cisId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cist.resName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <span>{formatDate(cist.cisDt)}</span>
                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {getDayOfWeek(cist.cisDt)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{cist.totalScore}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border ${getGradeBadgeStyle(cist.cisGrade)}`}>
                                            {cist.cisGrade}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <button
                                                onClick={() => onUpdate && onUpdate(cist.cisId)}
                                                className="inline-flex items-center justify-center px-3 py-1.5 mr-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                                수정
                                            </button>
                                            <button
                                                onClick={() => onDelete && onDelete(cist.cisId)}
                                                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 "
                                            >
                                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                                삭제
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CistAdminTable;