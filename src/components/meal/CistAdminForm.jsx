import React, { useState, useEffect } from "react";
import { useMyContext } from "../../ContextApi";
import { jwtDecode } from "jwt-decode";

const CistAdminForm = ({ handleAddCist, handleSelectResident, residents, latestDate, residentId }) => {
    // 토큰 가져오기
    const { token } = useMyContext();
    
    const [formData, setFormData] = useState({
        residentId: residentId,
        orientation: 0,
        attention: 0,
        spatialTemporal: 0,
        executiveFunction: 0,
        memory: 0,
        language: 0,
        totalScore: 0,
        resName: "",
        cisDt: "",
        giverId: jwtDecode(token).partId,
    });
    
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (residentId && residentId !== "0") {
            const selectedResident = residents.find(res => res.resId.toString() === residentId.toString());
            if (selectedResident) {
        setFormData(prevState => ({
            ...prevState,
                    residentId: selectedResident.resId,
                    resName: selectedResident.resName,
        }));
            }
        }
    }, [residentId, residents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAddCist(formData);
        setFormData({
            residentId: residentId,
            orientation: 0,
            attention: 0,
            spatialTemporal: 0,
            executiveFunction: 0,
            memory: 0,
            language: 0,
            totalScore: 0,
            resName: "",
            cisDt: "",
            giverId: jwtDecode(token).partId,
        });
    };

    const fields = [
        { field: "orientation", label: "지남력", icon: "🧭", max: 5},
        { field: "attention", label: "주의력", icon: "👁️", max: 3 },
        { field: "spatialTemporal", label: "시공간 능력", icon: "🔍", max: 2 },
        { field: "executiveFunction", label: "집행기능", icon: "⚙️", max: 6 },
        { field: "memory", label: "기억력", icon: "🧠" , max: 10},
        { field: "language", label: "언어기능", icon: "💬", max: 4 }
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-4 transition-all duration-300 w-full max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-4">인지 기능 평가</h2>
                
                <div className="flex flex-col space-y-6 mb-8 max-w-lg mx-auto">
                {/* 레지던트선택 */}
                    <div className="w-full">
                        <label htmlFor="residentId" className="block text-sm font-medium text-gray-700 mb-2">
                            레지던트 선택
                        </label>
                        <div className="relative">
                    <select
                        id="residentId"
                        name="residentId"
                        value={formData.residentId}
                        onChange={(e) => {
                            handleSelectResident(e.target.value);
                            handleInputChange(e);
                        }}
                        required
                                className="block w-full pl-3 pr-10 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors duration-200"
                    >
                        <option value="0">레지던트 선택</option>
                        {residents.map((res) => (
                            <option key={res.resId} value={res.resId}>{res.resName}</option>
                        ))}
                    </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                </div>
                        </div>
                    </div>

                {/* 검사 날짜 */}
                    <div className="w-full">
                        <label htmlFor="cisDt" className="block text-sm font-medium text-gray-700 mb-2">
                            검사 날짜
                        </label>
                    <input
                        type="date"
                        id="cisDt"
                        name="cisDt"
                        value={formData.cisDt}
                        onChange={handleInputChange}
                        required 
                            className="block w-full px-3 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min={today}
                    />
                </div>
            </div>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                    {fields.map(({ field, label, icon, max }) => (
                        <div key={field} className="group bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                            <label htmlFor={field} className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                <span className="text-xl mr-3">{icon}</span>
                                {label}
                                <span className="ml-auto text-xs text-gray-500">최대 {max}점</span>
                            </label>
                            <div className="relative">
                        <input
                            type="text"
                            id={field}
                            name={field}
                                    value={formData[field] || ""}
                            onChange={handleInputChange}
                                    min="0"
                                    max={max}
                                    className="block w-full px-3 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                            required
                        />
                            </div>
                    </div>
                ))}
            </div>
            
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-md shadow-md font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1  cursor-pointer "
                    >
                        데이터 추가하기
            </button>
                </div>
        </form>
        </div>
    );
};

export default CistAdminForm;
