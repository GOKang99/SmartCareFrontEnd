import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../ContextApi";

const NoticeList = () => {
  const [notices, setNotices] = useState([]); // 공지사항 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [filteredNotice, setFilteredNotice] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 유형 저장
  const { isAdmin } = useMyContext(); // 관리자 여부 확인

  const navigate = useNavigate();

  useEffect(() => {
    // 공지사항 데이터 가져오기
    const fetchNotices = async () => {
      try {
        const response = await api.get("/notice"); // 공지사항 API 호출
        setNotices(response.data); // 공지사항 데이터를 상태에 저장
        console.log(response.data);
        setFilteredNotice(response.data);
        setLoading(false); // 로딩 종료
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다.", error);
        setLoading(false);
      }
    };

    fetchNotices(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  const handleFilter = (category) => {
    setSelectedCategory(category);

    if (category === "전체") {
      setFilteredNotice(notices);
    } else {
      const filtered = notices.filter(
        (notice) => notice.noticeType === category
      );
      setFilteredNotice(filtered);
    }
  };

  return (
    <div className="w-[60%] m-auto min-h-screen mt-5  bg-white ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항
      </h2>

      {/* 공지 유형 버튼 추가 */}
      <div className="flex justify-center space-x-4 mb-4">
        {["전체", "공지", "식단", "계획표", "진료일정"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 text-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-6 py-3">번호</th>
              <th className="border px-6 py-3">유형</th>
              <th className="border px-6 py-3">제목</th>
              <th className="border px-6 py-3">작성자</th>
              <th className="border px-6 py-3">작성일</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotice.map((notice, index) => (
              <tr key={notice.noticeId} className="hover:bg-gray-200">
                <td className="border px-6 py-4 text-center">
                  {filteredNotice.length - index}
                </td>
                <td className="border px-6 py-4 text-center">
                  {notice.noticeType}
                </td>
                <td className="border px-6 py-4">
                  <Link to={`/notice/${notice.noticeId}`}>
                    {notice.noticeTitle}
                  </Link>
                </td>

                <td className="border px-6 py-4 text-center">
                  {notice.username || "Unknown"}
                </td>
                <td className="border px-6 py-4 text-center">
                  {new Date(notice.noticeDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 버튼 영역 */}
      {isAdmin && (
        <div className="flex justify-end space-x-6 mt-6 mb-6">
          <button
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={() => navigate("/notice/create")}
          >
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeList;
