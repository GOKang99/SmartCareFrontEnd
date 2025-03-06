import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(false);
        const response = await api.get(`/notice/${noticeId}`);
        console.log("공지사항 데이터: ", response.data);
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
    <div className="w-[60%] m-auto min-h-screen mt-5 bg-white rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항 상세보기
      </h2>

      {!loading ? (
        <p className="text-center text-lg text-gray-500">
          공지사항을 불러오는 중...
        </p>
      ) : notice ? (
        <div className="border border-gray-400 p-6 rounded-lg shadow-md bg-gray-100">
          <h3 className="text-2xl font-bold mb-4">{notice.noticeTitle}</h3>
          <p className="text-gray-700 mb-2">
            <strong>작성자:</strong> {notice.username || "Unknown"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>작성일:</strong>{" "}
            {notice.noticeDate
              ? new Date(notice.noticeDate).toLocaleString()
              : "날짜 없음"}
          </p>
          <hr className="my-4" />
          <p className="text-lg text-gray-800">{notice.noticeContent}</p>

          {/* 이미지 표시 추가 */}
          {notice.noticeImageURL && notice.noticeImageURL.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {notice.noticeImageURL.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:8080${url}`}
                  alt={`공지 이미지 ${index + 1}`}
                  className="w-[50%] h-[30%] object-cover rounded-lg border border-gray-300 hover:scale-101 transition-transform"
                  onClick={() => handleImageClick(url)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-red-500">
          공지사항을 찾을 수 없습니다.
        </p>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-between mt-6 mb-6">
        <button
          className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/notice")}
        >
          뒤로 가기
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
