import React, { useState, useEffect } from "react";

const CistAdminModal = ({ cist, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...cist
    });

    useEffect(() => {
        setFormData({ ...cist });
    }, [cist]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // 필드 정보 정의
    const fields = [
        { id: "orientation", label: "지남력", icon: "🧭", max: 5 },
        { id: "attention", label: "주의력", icon: "👁️", max: 3 },
        { id: "spatialTemporal", label: "시공간 능력", icon: "🔍", max: 2 },
        { id: "executiveFunction", label: "집행기능", icon: "⚙️", max: 6 },
        { id: "memory", label: "기억력", icon: "🧠", max: 10 },
        { id: "language", label: "언어기능", icon: "💬", max: 4 }
    ];

    // 포맷된 날짜 계산
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* 배경 오버레이 */}
            <div 
                className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* 모달 카드 */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden relative z-10 transform transition-all">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        인지 기능 평가 수정
                    </h2>
                </div>
                
                {/* 모달 컨텐츠 */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* 날짜 입력 */}
                    <div className="mb-6">
                        <label htmlFor="cisDt" className="block text-sm font-medium text-gray-700 mb-2">
                            검사 날짜
                        </label>
                        <input
                            type="date"
                            id="cisDt"
                            name="cisDt"
                            value={formatDate(formData.cisDt)}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                    
                    {/* 필드 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {fields.map((field) => (
                            <div key={field.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <label htmlFor={field.id} className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="mr-2 text-lg">{field.icon}</span>
                                    {field.label}
                                    <span className="ml-auto text-xs text-gray-500">최대 {field.max}점</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id={field.id}
                                        name={field.id}
                                        value={formData[field.id] || 0}
                                        onChange={handleInputChange}
                                        min="0"
                                        max={field.max}
                                        className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 버튼 */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            취소
                        </button>
                        <button 
                            type="submit" 
                            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CistAdminModal;