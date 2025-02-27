import React from "react";

const Notices = () => {
  return (
    <div className="w-full h-screen p-20 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 text-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-6 py-3">번호</th>
              <th className="border px-6 py-3">제목</th>
              <th className="border px-6 py-3">작성자</th>
              <th className="border px-6 py-3">작성일</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr key={id} className="hover:bg-gray-200">
                <td className="border px-6 py-4 text-center">{id}</td>
                <td className="border px-6 py-4">smartcare 운영정보 {id}</td>
                <td className="border px-6 py-4 text-center">giver1</td>
                <td className="border px-6 py-4 text-center">2025-02-19</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end space-x-6 mt-6">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
          글쓰기
        </button>
        <button className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700">
          수정하기
        </button>
        <button className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700">
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default Notices;
