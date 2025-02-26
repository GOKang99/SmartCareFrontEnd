import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useMyContext } from "../../ContextApi";

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

  return (
    <div className="w-full h-screen p-20 bg-white shadow-xl rounded-xl">
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
        </div>
      ) : (
        <p className="text-center text-lg text-red-500">
          공지사항을 찾을 수 없습니다.
        </p>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700"
          onClick={() => navigate(-1)}
        >
          뒤로 가기
        </button>

        {isAdmin && (
          <div className="space-x-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
              onClick={() => navigate(`/notice/edit/${noticeId}`)}
            >
              수정하기
            </button>
            <button
              className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700"
              onClick={() => console.log("삭제 기능 추가 예정")}
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
