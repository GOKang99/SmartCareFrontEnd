import React, { useState } from "react";

const Popup = ({ popupWindow }) => {
  // ✅ 개별 체크 상태 관리
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  // ✅ 전체 동의 여부 (둘 다 체크되었는지 확인)
  const isAgreed = termsChecked && privacyChecked;

  // 확인 버튼 클릭 시 부모창의 setAgreement(true) 실행
  const handleConfirm = () => {
    if (window.opener && typeof window.opener.setAgreement === "function") {
      window.opener.setAgreement(true); // 부모 창의 체크박스 활성화
    }
    popupWindow.close();
  };

  // ✅ 팝업 닫기
  const handleClose = () => {
    if (popupWindow) {
      popupWindow.close();
    } else {
      alert("이 창은 닫을 수 없습니다!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-10 my-10">
      {/* 이용약관 섹션 */}
      <section className="h-[400px] overflow-y-auto border border-gray-300 p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-4">이용약관</h1>
        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
          (여기에 약관 내용)
        </p>
      </section>

      {/* ✅ 첫 번째 체크박스 (이용약관 동의) */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          checked={termsChecked}
          onChange={() => setTermsChecked(!termsChecked)}
          className="w-5 h-5"
        />
        <label className="text-lg font-semibold text-gray-700">
          이용약관에 동의합니다.
        </label>
      </div>

      {/* 개인정보 이용동의 섹션 */}
      <section className="h-[400px] overflow-y-auto border border-gray-300 p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-4">개인정보 이용동의</h1>
        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
          (여기에 개인정보 이용동의 내용)
        </p>
      </section>

      {/* ✅ 두 번째 체크박스 (개인정보 이용 동의) */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          checked={privacyChecked}
          onChange={() => setPrivacyChecked(!privacyChecked)}
          className="w-5 h-5"
        />
        <label className="text-lg font-semibold text-gray-700">
          개인정보 이용에 동의합니다.
        </label>
      </div>

      {/* ✅ 버튼 영역 */}
      <div className="flex justify-end space-x-4 mt-6">
        {/* 확인 버튼 (두 개 다 체크해야 활성화) */}
        <button
          className={`px-4 py-2 rounded-lg ${
            isAgreed
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isAgreed}
          onClick={handleConfirm}
        >
          확인
        </button>
        {/* 닫기 버튼 */}
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Popup;
