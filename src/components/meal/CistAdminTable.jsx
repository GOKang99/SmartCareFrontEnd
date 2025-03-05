import React from "react";

const CistAdminTable = ({ cists, isAdmin, onUpdate, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">CIST ID</th>
                        <th className="px-4 py-2 border">레지던트 이름</th>
                        <th className="px-4 py-2 border">검사 날짜</th>
                        <th className="px-4 py-2 border">총점</th>
                        <th className="px-4 py-2 border">등급</th>
                        {isAdmin && <th className="px-4 py-2 border">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {cists.map(cist => (
                        <tr key={cist.cisId}>
                            <td className="px-4 py-2 border">{cist.cisId}</td>
                            <td className="px-4 py-2 border">{cist.resName}</td>
                            <td className="px-4 py-2 border">{new Date(cist.cisDt).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{cist.totalScore}</td>
                            <td className="px-4 py-2 border">{cist.cisGrade}</td>
                            {isAdmin && (
                                <td className="px-4 py-2 border">
                                    <button 
                                        onClick={() => onUpdate(cist.cisId)} 
                                        className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                                    >
                                        수정
                                    </button>
                                    <button 
                                        onClick={() => onDelete(cist.cisId)} 
                                        className="bg-red-500 text-white py-1 px-3 rounded"
                                    >
                                        삭제
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CistAdminTable;