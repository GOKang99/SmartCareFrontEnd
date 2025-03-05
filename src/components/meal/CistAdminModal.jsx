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
        onSave(formData); // 부모 컴포넌트에서 받은 함수 호출
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">CIST 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                    
                    <div className="flex justify-end space-x-4">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            취소
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CistAdminModal;