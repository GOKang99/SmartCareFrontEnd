import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useMyContext } from "../../ContextApi";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const NoticeDetail = () => {
  const { noticeId } = useParams(); // URL에서 공지사항 ID 가져오기
  const navigate = useNavigate();
  const [notice, setNotice] = useState();
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useMyContext();

  const isFetched = useRef(false); // 중복 실행 방지용 ref 추가

  useEffect(() => {
    // console.log("유즈이펙트 실행됨!");

    if (isFetched.current) return; // 이미 실행된 경우, 다시 실행 방지
    isFetched.current = true; // 첫 실행 후 true로 변경

    const fetchNotice = async () => {
      try {
        // setLoading(false);
        const response = await api.get(`/notice/${noticeId}`);
        // console.log("공지사항 데이터: ", response.data);
        setNotice(response.data);
        // console.log("한글", response.data);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류 발생! ", error);
      } finally {
        setLoading(true);
      }
    };
    fetchNotice();
  }, [noticeId]);

  // 🔥 공지사항 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) return;

    try {
      setLoading(false);
      await api.delete(`/notice/${noticeId}`);
      toast.success("공지사항이 삭제되었습니다.");
      navigate("/notice"); // 목록 페이지로 이동
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
      toast.error("공지사항 삭제에 실패했습니다.");
    } finally {
      setLoading(true);
    }
  };

  const handleImageClick = (url) => {
    const width = 800; // 창 가로 크기
    const height = 600; // 창 세로 크기
    const left = (window.innerWidth - width) / 2; // 창을 중앙에 배치
    const top = (window.innerHeight - height) / 2; // 창을 중앙에 배치

    window.open(
      `http://localhost:8080${url}`,
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}, resizable=yes, scrollbars=yes`
    );
  };

  return (
    <div className="w-[60%] m-auto min-h-screen mt-5 mb-6 bg-white p-6 rounded-xl shadow-md flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {notice?.noticeTitle || ".. 로딩중"}
      </h2>

      {!loading ? (
        <p className="text-center text-lg text-gray-500">
          공지사항을 불러오는 중...
        </p>
      ) : notice ? (
        // 작성자 작성일
        <>
          <hr className="my-4" />
          <div className="flex flex-col justify-end items-start text-gray-500 text-sm mb-6 border-b border-gray-300">
            <p className="text-gray-700 mb-2">
              <strong>작성자:</strong> {notice.giverName || "Unknown"}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>작성일:</strong>{" "}
              {notice.noticeDate
                ? new Date(notice.noticeDate).toLocaleString()
                : "날짜 없음"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mb-4">
            {/* 이미지 표시 추가 */}
            {notice.noticeImageURL && notice.noticeImageURL.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                {notice.noticeImageURL.map((url, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8080${url}`}
                    alt={`공지 이미지 ${index + 1}`}
                    className={`rounded-lg border border-gray-300 object-cover transition-transform
                                 ${
                                   notice.noticeImageURL.length === 1
                                     ? "w-[600px] "
                                     : "max-w-[45%] "
                                 }`}
                    onClick={() => handleImageClick(url)}
                  />
                ))}
              </div>
            )}
            <p className="text-md text-gray-800 mt-8 whitespace-pre-line text-center">
              {notice.noticeContent}
            </p>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-red-500">
          공지사항을 찾을 수 없습니다.
        </p>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-auto">
        <button
          className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/notice")}
        >
          목록으로
        </button>

        {isAdmin && (
          <div className="space-x-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate(`/notice/edit/${noticeId}`)}
            >
              수정하기
            </button>
            <button
              className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 cursor-pointer"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
