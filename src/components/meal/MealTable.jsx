import React from "react";
import "./MealTable.css";

const MealTable = ({ meals, isAdmin, onUpdate, onDelete }) => {
    // 요일을 한글로 변환하는 함수
    const getDayOfWeek = (date) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    return (
        <div className="mealtable overflow-x-auto mb-6">
            <table className="min-w-full">
                <thead>
                    <tr className=" text-gray-800">
                        <th rowSpan="2" className="p-2 border border-black">성명</th>
                        <th rowSpan="2" className="p-2 border border-black">일자(요일)</th>
                        <th colSpan="3" className="p-2 border border-black">식사</th>
                        <th colSpan="2" className="p-2 border border-black">간식</th>
                        {isAdmin && <th rowSpan="2" className="p-2 border border-black">관리</th>}
                    </tr>
                    <tr>
                        <th className="p-2 border border-black">아침</th>
                        <th className="p-2 border border-black">점심</th>
                        <th className="p-2 border border-black">저녁</th>
                        <th className="p-2 border border-black">오전</th>
                        <th className="p-2 border border-black">오후</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.length > 0 ? (
                        meals.map((meal) => (
                            <tr key={meal.medId} className="text-center odd:bg-gray-100 even:bg-white">
                                 <td className="p-2 border border-black">{meal.resName}</td>
                                <td className="p-2 border border-black">{meal.meaDt} ({getDayOfWeek(meal.meaDt)})</td>
                                <td className="p-2 border border-black">{meal.breQty}</td>
                                <td className="p-2 border border-black">{meal.lunQty}</td>
                                <td className="p-2 border border-black">{meal.dinQty}</td>
                                <td className="p-2 border border-black">{meal.morSnackQty}</td>
                                <td className="p-2 border border-black">{meal.aftSnackQty}</td>
                                {isAdmin && (
                                    <td className="p-2 border border-black font-bold">
                                        <button 
                                            onClick={() => onUpdate(meal.medId)} 
                                            className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white px-5 py-2 rounded mx-1 cursor-pointer mr-5"
                                        >
                                            수정
                                        </button>
                                        <button 
                                            onClick={() => onDelete(meal.medId)} 
                                            className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white px-5 py-2 rounded mx-1 cursor-pointer"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-4 border border-black text-gray-500 text-center">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MealTable;