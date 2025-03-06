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
  const [existingImages, setExistingImages] = useState([]); // 기존이미지
  const [newFiles, setNewFiles] = useState([]); // 새 이미지 파일
  const [newFilePreviews, setNewFilePreviews] = useState([]); // 미리보기 이미지
  const [deletedImages, setDeletedImages] = useState([]); // 삭제할 이미지 추적
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
        setExistingImages(data.noticeImageURL || []);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류 발생", error);
        setError("공지사항을 불러오는 데 실패했습니다");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  //파일추가
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prevFiles) => [...prevFiles, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewFilePreviews((prev) => [...prev, ...previews]);
  };

  // 업로드 전 새 이미지 삭제
  const handleRemoveNewFile = (index) => {
    const updatedFiles = [...newFiles];
    const updatedPreviews = [...newFilePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setNewFiles(updatedFiles);
    setNewFilePreviews(updatedPreviews);
  };

  // 기존 이미지 삭제
  const handleRemoveExistingImage = (index) => {
    const removedImage = existingImages[index];

    setDeletedImages((prev) => [...prev, removedImage]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  //수정된 내용 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("noticeType", noticeType);
      formData.append("noticeTitle", noticeTitle);
      formData.append("noticeContent", noticeContent);

      // 기존 이미지 유지
      existingImages
        .filter((img) => !deletedImages.includes(img))
        .forEach((img) => formData.append("existingImages", img));

      // 삭제할 기존 이미지 전송
      deletedImages.forEach((img) => formData.append("deletedImages", img));

      // 새 이미지 추가
      newFiles.forEach((file) => formData.append("noticeImageFiles", file));

      //수정 요청
      await api.put(`/notice/edit/${noticeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    <div className="w-[60%] mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
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

        {/* 기존 이미지 미리보기 & 삭제 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            기존이미지
          </label>
          <div className="flex flex-wrap gap-2">
            {existingImages.length > 0 ? (
              existingImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={`http://localhost:8080${url}`}
                    alt={`기존이미지 ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    onClick={() => handleRemoveExistingImage(index)}
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">첨부된 이미지가 없습니다</p>
            )}
          </div>
        </div>

        {/* 새 이미지 업로드 & 미리보기 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            추가할 이미지 (여러 개 선택 가능)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {newFilePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`새 이미지 ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                  onClick={() => handleRemoveNewFile(index)}
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
