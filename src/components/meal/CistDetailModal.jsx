import React from "react";
import Modal from "react-modal";

// 모달 스타일 설정
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        padding: "25px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
};

 // 날짜 형변환
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear(); // 연도(YYYY)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1, 두 자리로 맞춤)
    const day = String(date.getDate()).padStart(2, "0"); // 일 (두 자리로 맞춤)
    return `${year}.${month}.${day}`; // "xxxx.xx.xx" 형식으로 반환
};

// appElement 설정 (루트 요소를 지정)
Modal.setAppElement("#root"); // 또는 document.getElementById("root") 

const CistDetailModal = ({ cist, onClose }) => {
    return (
        <Modal
            isOpen={!!cist}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="검사 결과 상세 정보"
        >
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">{formatDate(cist.cisDt)} 검사 결과</h2>
                <ul>
                    <li>지남력: {cist.orientation}/5</li>
                    <li>주의력: {cist.attention}/3</li>
                    <li>시공간능력: {cist.spatialTemporal}/2</li>
                    <li>집행기능: {cist.executiveFunction}/6</li>
                    <li>기억력: {cist.memory}/10</li>
                    <li>언어기능: {cist.language}/4</li>
                    <li className="font-bold">총점: {cist.totalScore}/30</li>
                    <li className="font-bold">판정: {cist.cisGrade}</li>
                </ul>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    닫기
                </button>
            </div>
        </Modal>
    );
};

export default CistDetailModal;