import React from "react";

const MealTable = ({ meals, isAdmin, onUpdate, onDelete }) => {
    // ✅ 내림차순 정렬 (최근 날짜 → 과거)
    const sortedMeals = [...meals].sort((a, b) => new Date(b.meaDt) - new Date(a.meaDt));

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-black">
          <thead>
            <tr className="bg-green-500 text-white">
              <th rowSpan="2" className="p-2 border border-black">일자(요일)</th>
              <th colSpan="3" className="p-2 border border-black">식사</th>
              <th colSpan="2" className="p-2 border border-black">간식</th>
              {isAdmin && <th rowSpan="2" className="p-2 border border-black">관리</th>}
            </tr>
            <tr className="bg-gray-300">
              <th className="p-2 border border-black">아침</th>
              <th className="p-2 border border-black">점심</th>
              <th className="p-2 border border-black">저녁</th>
              <th className="p-2 border border-black">오전</th>
              <th className="p-2 border border-black">오후</th>
            </tr>
          </thead>
          <tbody>
            {sortedMeals.length > 0 ? (
              sortedMeals.map((meal) => (
                <tr key={meal.medId} className="text-center odd:bg-gray-100 even:bg-white">
                  <td className="p-2 border border-black">{meal.meaDt}</td>
                  <td className="p-2 border border-black">{meal.breQty}</td>
                  <td className="p-2 border border-black">{meal.lunQty}</td>
                  <td className="p-2 border border-black">{meal.dinQty}</td>
                  <td className="p-2 border border-black">{meal.morSnackQty}</td>
                  <td className="p-2 border border-black">{meal.aftSnackQty}</td>
                  {isAdmin && (
                    <td className="p-2 border border-black">
                      <button
                        onClick={() => {
                          console.log("📝 수정 요청 ID:", meal.medId);
                          if (meal.medId === undefined) {
                            console.error("❌ meal.id가 undefined입니다!");
                          }
                          onUpdate(meal.medId);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded mx-1"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          console.log("🗑 삭제 요청 ID:", meal.medId);
                          if (meal.medId === undefined) {
                            console.error("❌ meal.id가 undefined입니다!");
                          }
                          onDelete(meal.medId);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded mx-1"
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
