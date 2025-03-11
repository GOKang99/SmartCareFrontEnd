import { useEffect, useState } from "react";
import api from "../../services/api";
import { data, Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../ContextApi";

const NoticeList = () => {
  const [notices, setNotices] = useState([]); // 공지사항 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [filteredNotice, setFilteredNotice] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 유형 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한페이지에 보여줄 개수
  const [searchType, setSearchType] = useState("전체"); // 검색 유형
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
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
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동

    let updatedNotices = notices;
    if (category !== "전체") {
      updatedNotices = notices.filter(
        (notice) => notice.noticeType === category
      );
    }

    //검색어에도 적용
    applySearchFilter(updatedNotices);
  };

  // 검색 초기화
  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchType("전체");
    setFilteredNotice(notices);
    setCurrentPage(1);
  };

  // 검색 실행
  const handleSearch = () => {
    applySearchFilter(notices);
    setCurrentPage(1);
  };

  const applySearchFilter = (data) => {
    let filteredData = data;

    if (searchQuery.trim() !== "") {
      filteredData = data.filter((notice) => {
        const tilteMatch = notice.noticeTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const authorMatch = notice.giverName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        if (searchType === "제목") return tilteMatch;
        if (searchType === "작성자") return authorMatch;
        return tilteMatch || authorMatch; //전체검색
      });
    }

    setFilteredNotice(filteredData);
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  //   setCurrentPage(1);
  //   applySearchFilter(notices);
  // };

  // 현재 페이지의 데이터 가져오기
  const indexOfLastItem = currentPage * itemsPerPage; // 끝인덱스
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 시작 인덱스
  const currentItem = filteredNotice.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPage = Math.ceil(filteredNotice.length / itemsPerPage);

  return (
    <div className="w-[60%] m-auto min-h-screen mt-5  bg-white ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항
      </h2>

      {/* 공지 유형 버튼 추가 */}
      <div className="flex justify-center space-x-4 mb-4 ">
        {["전체", "공지", "식단", "계획표", "진료일정"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded-lg text-white hover:bg-gray-500 transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="전체">전체</option>
          <option value="제목">제목</option>
          <option value="작성자">작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          검색
        </button>

        {/* 검색 초기화 버튼 */}
        <button
          onClick={handleResetSearch}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          초기화
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 text-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-6 py-3 w-[3%]">번호</th>
              <th className="border px-6 py-3 w-[5%]">유형</th>
              <th className="border px-6 py-3 w-[20%]">제목</th>
              <th className="border px-6 py-3 w-[5%]">작성자</th>
              <th className="border px-6 py-3 w-[7%]">작성일</th>
              <th className="border px-6 py-3 w-[3%]">조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((notice, index) => (
              <tr key={notice.noticeId} className="hover:bg-gray-200">
                <td className="border px-1 py-4 text-center">
                  {filteredNotice.length -
                    (currentPage - 1) * itemsPerPage -
                    index}
                </td>
                <td className="border px-5 py-4 text-center">
                  {notice.noticeType}
                </td>
                <td className="border px-8 py-4">
                  <Link to={`/notice/${notice.noticeId}`}>
                    {notice.noticeTitle}
                  </Link>
                </td>

                <td className="border px-3 py-4 text-center">
                  {notice.giverName || "Unknown"}
                </td>
                <td className="border px-1 py-4 text-center">
                  {new Date(notice.noticeDate).toLocaleDateString("KO-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
                <td className="border px-1 py-4 text-center">
                  {notice.noticeCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이징 버튼 */}
      <div className="flex justify-center mt-6 space-x-2 mb-6">
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          처음
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 transition"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg  ${
              currentPage === i + 1
                ? "bg-blue-600 text-white  hover:bg-blue-700 transition"
                : "bg-gray-200  hover:bg-gray-300 transition"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white  hover:bg-blue-700 transition"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          다음
        </button>
        <button
          onClick={() => handlePageChange(totalPage)}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          끝으로
        </button>
      </div>

      {/* 버튼 영역 */}
      {isAdmin && (
        <div className="flex justify-end space-x-6 mt-6 mb-3">
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
