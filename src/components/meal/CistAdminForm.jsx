import React, { useState, useEffect } from "react";
import { useMyContext } from "../../ContextApi";
import { jwtDecode } from "jwt-decode";


const CistAdminForm = ({ handleAddCist, handleSelectResident, residents, latestDate, residentId }) => {
    const {token}=useMyContext();
    const [formData, setFormData] = useState({
        residentId: residentId || "0",
        orientation: "",
        attention: "",
        spatialTemporal: "",
        executiveFunction: "",
        memory: "",
        language: "",
        cisDt: latestDate || new Date().toISOString().slice(0, 10),  // 기본값으로 최신 날짜
        giver:jwtDecode(token).partId,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddCist(formData); // 부모 컴포넌트에서 받은 함수 호출
        setFormData({
            residentId: residentId || "0",
            orientation: "",
            attention: "",
            spatialTemporal: "",
            executiveFunction: "",
            memory: "",
            language: "",
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
                        className="border px-3 py-2 w-full"
                    >
                        <option value="0">레지던트 선택</option>
                        {residents.map(res => (
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
                        className="border px-3 py-2 w-full"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {["orientation", "attention", "spatialTemporal", "executiveFunction", "memory", "language"].map((field) => (
                    <div key={field} className="mb-4">
                        <label htmlFor={field} className="block mb-1">{field}</label>
                        <input
                            type="number"
                            id={field}
                            name={field}
                            value={formData[field]}
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