import React, { useState, useEffect } from "react";
import { useMyContext } from "../../ContextApi";
import { jwtDecode } from "jwt-decode";


const CistAdminForm = ({ handleAddCist, handleSelectResident, residents, latestDate, residentId }) => {
    //토큰 가져오기
    const {token}=useMyContext();
    
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
        cisDt: latestDate || new Date().toISOString().slice(0, 10),  // 기본값으로 최신 날짜
        giverId:jwtDecode(token).partId,
    });
    
    const today = new Date().toISOString().split("T")[0];

    
    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            residentId: residentId || "0"
        }));
    }, [residentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
         // 빈 값이 있는지 확인
        //  for (const key in formData) {
        //     if (!formData[key]) {
        //         alert("모든 항목을 선택해주세요!");
        //         return;
        //     }
        // }
        console.log("📢 추가되는 데이터:", FormData);
        handleAddCist(formData); // 부모 컴포넌트에서 받은 함수 호출
        console.log("이;이이이ㅣ이이이이이이ㅣ이이이이",formData)
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
            cisDt: latestDate || new Date().toISOString().slice(0, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex space-x-4">
                <div className="w-1/3">
                    <label htmlFor="residentId" className="block mb-1">레지던트 선택</label>
                    <select
                        id="residentId"
                        name="residentId"
                        value={formData.residentId}
                        onChange={(e) => {
                            handleSelectResident(e.target.value);
                            handleInputChange(e);
                        }}
                        required
                        className="border px-3 py-2 w-full"
                    >
                        <option value="0">레지던트 선택</option>
                        {residents.map((res) => (
                            <option key={res.resId} value={res.resId}>{res.resName}</option>
                        ))}
                    </select>
                </div>
                <div className="w-2/3">
                    <label htmlFor="cisDt" className="block mb-1">검사 날짜</label>
                    <input
                        type="date"
                        id="cisDt"
                        name="cisDt"
                        value={formData.cisDt}
                        onChange={handleInputChange}
                        required 
                        className="border px-3 py-2 w-full"
                        min={today}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {[
                    { field: "orientation", label: "지남력" },
                    { field: "attention", label: "주의력" },
                    { field: "spatialTemporal", label: "시공간 능력" },
                    { field: "executiveFunction", label: "집행기능" },
                    { field: "memory", label: "기억력" },
                    { field: "language", label: "언어기능" }
                ].map(({ field, label }) => (
                    <div key={field} className="mb-4">
                        <label htmlFor={field} className="block mb-1">{label}</label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={formData[field] || ""} //undefined를 빈 문자열로 처리
                            onChange={handleInputChange}
                            className="border px-3 py-2 w-full"
                        />
                    </div>
                ))}
            </div>
            
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                추가
            </button>
        </form>
    );
};

export default CistAdminForm;