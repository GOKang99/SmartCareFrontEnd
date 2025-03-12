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
        // console.log(response.data);
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
      <div className="flex justify-center rounded-xl">
        <div className="inline-flex rounded-xl shadow-xs mb-6 " role="group">
          {["전체", "공지", "식단", "계획표", "진료일정"].map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-400 focus:text-blue-700 ${
                selectedCategory === category
                  ? " text-gray-600 focus:ring-blue-300"
                  : "hover:bg-gray-100 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 검색부분 */}
      <div className="flex justify-center mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="shrink-0 z-10 inline-flex items-center 
                     py-2.5 px-4 text-sm font-medium 
                    text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg
                    hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100
                    dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white
                    dark:border-gray-600"
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
          className="block p-2.5 w-100 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg
                   border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500
                   focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="relative flex items-center justify-center p-2.5 text-sm font-medium w-17
                   text-white bg-blue-700 rounded-lg border border-blue-700
                   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          검색
        </button>

        {/* 검색 초기화 버튼 */}
        <button
          onClick={handleResetSearch}
          className="relative flex items-center justify-center p-2.5 text-sm font-medium w-20
                   bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          초기화
        </button>
      </div>

      {/* 테이블 */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                번호
              </th>
              <th scope="col" className="px-6 py-3 ">
                유형
              </th>
              <th scope="col" className="px-6 py-3 w-[40%] ">
                제목
              </th>
              <th scope="col" className="px-6 py-3 ">
                작성자
              </th>
              <th scope="col" className="px-6 py-3 ">
                작성일
              </th>
              <th scope="col" className="px-6 py-3 ">
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((notice, index) => (
              <tr
                key={notice.noticeId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-200"
              >
                <td className="px-6 py-4">
                  {filteredNotice.length -
                    (currentPage - 1) * itemsPerPage -
                    index}
                </td>
                <td className="px-6 py-4">{notice.noticeType}</td>
                <td className="px-6 py-4">
                  <Link to={`/notice/${notice.noticeId}`}>
                    {notice.noticeTitle}
                  </Link>
                </td>

                <td className="px-6 py-4">{notice.giverName || "Unknown"}</td>
                <td className="px-6 py-4">
                  {new Date(notice.noticeDate).toLocaleDateString("KO-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
                <td className="px-6 py-4">{notice.noticeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이징 버튼 */}
      <nav
        aria-label="Page navigation example"
        className="flex justify-center mt-6 mb-6"
      >
        <ul className="flex items-center -space-x-px h-10 text-base">
          {/* 처음 버튼 */}
          <li>
            <button
              onClick={() => handlePageChange(1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 transition"
            >
              처음
            </button>
          </li>

          {/* 이전 버튼 */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              }`}
            >
              이전
            </button>
          </li>

          {/* 페이지 번호 버튼 */}
          {Array.from({ length: totalPage }, (_, i) => (
            <li key={i + 1}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  currentPage === i + 1
                    ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}

          {/* 다음 버튼 */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                currentPage === totalPage
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              }`}
            >
              다음
            </button>
          </li>

          {/* 끝으로 버튼 */}
          <li>
            <button
              onClick={() => handlePageChange(totalPage)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 transition"
            >
              끝으로
            </button>
          </li>
        </ul>
      </nav>

      {/* 버튼 영역 */}
      {isAdmin && (
        <div className="flex justify-end space-x-6 mt-6 mb-3">
          <button
            className="px-6 py-3 bg-[#475773] text-white text-lg rounded-lg hover:bg-[#1E2939] cursor-pointer"
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
