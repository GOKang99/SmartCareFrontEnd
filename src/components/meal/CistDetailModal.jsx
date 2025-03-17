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
        maxWidth: "500px",
        width: "90%",
        padding: "0",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
    },
};

// 날짜 형변환
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
};

// 등급에 따른 색상 및 아이콘 반환
const getGradeInfo = (grade) => {
    switch(grade) {
        case 'A':
            return { color: 'bg-green-100 text-green-800 border-green-200', icon: '🌟' };
        case 'B':
            return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '✨' };
        case 'C':
            return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '👍' };
        case 'D':
            return { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '⚠️' };
        case 'F':
            return { color: 'bg-red-100 text-red-800 border-red-200', icon: '❗' };
        default:
            return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '📊' };
    }
};

// appElement 설정 (루트 요소를 지정)
Modal.setAppElement("#root");

const CistDetailModal = ({ cist, onClose }) => {
    if (!cist) return null;
    
    const { color, icon } = getGradeInfo(cist.cisGrade);
    
    const categories = [
        { name: "지남력", value: cist.orientation, max: 5, icon: "🧭" },
        { name: "주의력", value: cist.attention, max: 3, icon: "👁️" },
        { name: "시공간능력", value: cist.spatialTemporal, max: 2, icon: "🔍" },
        { name: "집행기능", value: cist.executiveFunction, max: 6, icon: "⚙️" },
        { name: "기억력", value: cist.memory, max: 10, icon: "🧠" },
        { name: "언어기능", value: cist.language, max: 4, icon: "💬" }
    ];

    // 프로그레스 바 계산
    const getPercentage = (value, max) => (value / max) * 100;
    
    return (
        <Modal
            isOpen={!!cist}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="검사 결과 상세 정보"
        >
            <div className="flex flex-col">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center">
                    <h2 className="text-xl font-bold">{cist.resName}님의 인지 기능 평가</h2>
                    <p className="text-blue-100 mt-1">{formatDate(cist.cisDt)}</p>
                </div>
                
                {/* 메인 콘텐츠 */}
                <div className="p-6">
                    {/* 총점 및 등급 */}
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-6">
                        <div className="text-center flex-1">
                            <div className="text-4xl font-bold text-gray-800">{cist.totalScore}</div>
                            <div className="text-sm text-gray-500">총점 (30점 만점)</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border-2 ${color}`}>
                                {icon} {cist.cisGrade} 등급
                            </div>
                        </div>
                    </div>
                    
                    {/* 세부 항목 */}
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <div key={category.name} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <span className="mr-2 text-xl">{category.icon}</span>
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                    <div className="font-bold text-gray-700">
                                        {category.value} / {category.max}
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${getPercentage(category.value, category.max)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* 푸터/버튼 */}
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-center">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-md shadow-sm transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        모달 닫기
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CistDetailModal;