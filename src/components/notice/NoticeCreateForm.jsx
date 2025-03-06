import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const NoticeCreateForm = () => {
  const [noticeType, setNoticeType] = useState("공지"); // 공지유형
  const [noticeTitle, setNoticeTitle] = useState(""); // 공지제목
  const [noticeContent, setNoticeContent] = useState(""); // 공지내용
  const [files, setFiles] = useState([]); // 파일 업로드
  const [filePreviews, setFilePreviews] = useState([]); // 미리보기 이미지
  const [loading, setLoading] = useState(false); // 로딩상태
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 글쓰기 후 리디렉션

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setFiles([...files, ...selectedFiles]);
    setFilePreviews([...filePreviews, ...previews]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...filePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 파일 업로드로 수정 폼데이터 설정
      const formData = new FormData();
      formData.append("noticeType", noticeType);
      formData.append("noticeTitle", noticeTitle);
      formData.append("noticeContent", noticeContent);

      // 여러개의 파일 추가
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("noticeImageFiles", file); // 백엔드에서 받을 필드명
        });
      }

      // 글쓰기 Post 요청
      await api.post("/notice/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("공지사항이 성공적으로 작성되었습니다.");
      navigate("/notice"); // 글 작성 후 공지사항 목록 페이지로 이동
    } catch (error) {
      console.error("공지사항 작성 중 오류가 발생했습니다.", error);
      setError("공지사항을 작성하는 동안 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[60%] mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        공지사항 글쓰기
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

        {/* 🔹 파일 업로드&미리보기 추가 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            파일 첨부 (여러 개 선택 가능)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />

          {/* 미리보기 */}
          <div className="flex flex-wrap gap-2 mt-2">
            {filePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`미리보기 ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                  onClick={() => handleRemoveFile(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
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
            className="px-6 py-2 bg-gray-500 text-white text-lg rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate("/notice")} // 취소 버튼 클릭 시 이동
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeCreateForm;
