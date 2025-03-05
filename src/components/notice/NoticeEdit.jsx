import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const NoticeEdit = () => {
  const { noticeId } = useParams(); //URL 에서 공지사항 ID 가져오기
  const navigate = useNavigate();
  const [noticeType, setNoticeType] = useState("공지");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 기존 공지사항 불러오기
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/notice/${noticeId}`);
        const data = response.data;
        setNoticeType(data.noticeType);
        setNoticeTitle(data.noticeTitle);
        setNoticeContent(data.noticeContent);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류 발생", error);
        setError("공지사항을 불러오는 데 실패했습니다");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  //수정된 내용 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        noticeType,
        noticeTitle,
        noticeContent,
      };

      //수정 요청
      await api.put(`/notice/edit/${noticeId}`, data);
      toast.success("공지사항이 성공적으로 수정되었습니다!");
      navigate(`/notice/${noticeId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("공지사항 수정 중 오류가 발생했습니다", error);
      setError("공지사항을 수정하는 동안 문제가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항 수정
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* 🔹 공지 유형 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            공지 유형
          </label>
          <select
            value={noticeType}
            onChange={(e) => setNoticeType(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="공지">공지</option>
            <option value="식단">식단</option>
            <option value="계획표">계획표</option>
            <option value="진료일정">진료일정</option>
          </select>
        </div>

        {/* 🔹 공지 제목 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            공지 제목
          </label>
          <input
            type="text"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="공지 제목을 입력하세요"
            required
          />
        </div>

        {/* 🔹 공지 내용 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            공지 내용
          </label>
          <textarea
            value={noticeContent}
            onChange={(e) => setNoticeContent(e.target.value)}
            className="w-full p-2 border rounded-md h-32 resize-none"
            placeholder="공지 내용을 입력하세요"
            required
          />
        </div>

        {/* 🔹 버튼 영역 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white text-lg rounded-lg hover:bg-gray-600"
            onClick={() => navigate(-1)} // 취소 버튼 클릭 시 이전 페이지로 이동
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeEdit;
