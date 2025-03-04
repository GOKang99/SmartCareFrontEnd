import React from "react";

const CompositionTable = ({ compositions, showActions = false }) => {
  return (
    <div className="flex justify-center items-center p-3">
      <table className="w-300 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">이름</th>
            <th className="border border-gray-300 px-4 py-2">검사일자</th>
            <th className="border border-gray-300 px-4 py-2">신장 (cm)</th>
            <th className="border border-gray-300 px-4 py-2">체중 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">골격근량 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">체지방량 (kg)</th>
            <th className="border border-gray-300 px-4 py-2">체지방률 (%)</th>
            <th className="border border-gray-300 px-4 py-2">BMI</th>
            <th className="border border-gray-300 px-4 py-2">내장지방레벨</th>
            {showActions && (
              <>
                <th className="border border-gray-300 px-4 py-2">수정</th>
                <th className="border border-gray-300 px-4 py-2">삭제</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {compositions.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {item.comResName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comHeight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comWeight}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comSmm}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comBfm}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comPbf}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comBmi}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.comFatLvl}
              </td>
              {showActions && (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      수정
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompositionTable;
