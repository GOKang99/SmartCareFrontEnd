import React, { useEffect, useState, useCallback } from "react";
import { getAllCistsForAdmin, addCist, updateCist, deleteCist, getResidents } from "../../services/CistService";

import api from "../../services/api";
import CistAdminForm from "./CistAdminForm";
import CistAdminTable from "./CistAdminTable";
import CistAdminModal from "./CistAdminModal";

const CistAdminPage = () => {
    const [cists, setCists] = useState([]);
    const [residents, setResidents] = useState([]);  // 레지던트 목록 상태
    const [residentId, setResidentId] = useState("0");  // 레지던트 목록 상태
    const [isLoading, setIsLoading] = useState(true);
    const [latestDate, setLatestDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열기 상태
    const [cistToEdit, setCistToEdit] = useState(null);  // 수정할 CIST 데이터

    // ✅ DB데이터 모든 정보 불러오기
    const fetchCists = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllCistsForAdmin();
            
            const getRes = await getResidents();
    
            setResidents(getRes);
            let sortedCists = (data || []).sort((a, b) => new Date(b.cisDt) - new Date(a.cisDt)); 
            if(residentId !== "0"){
                sortedCists = sortedCists.filter(cist => cist.resResidentId == residentId);
            }
            
            setCists(sortedCists);
            if (sortedCists.length > 0) {
                setLatestDate(sortedCists[0].cisDt); // 최신 날짜 반영
            }
        } catch (error) {
            console.error("❌ CIST 데이터를 불러오는 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
        }
    }, [residentId]);

    useEffect(() => {
        fetchCists();
    }, [fetchCists]);

    // CIST 추가
    const handleAddCist = async (newCist) => {
        try {
            const isDuplicate = cists.some(cist => cist.cisDt === newCist.cisDt && cist.resResidentId == newCist.resResidentId);
            
            if (isDuplicate) {
                alert("이 날짜의 CIST가 이미 추가되어 있습니다.");
                return;
            }
    
            await addCist(newCist);
            await fetchCists();  // 데이터 새로고침
        } catch (error) {
            console.error("❌ CIST 추가 오류:", error);
        }
    };

    // 레지던트 선택 처리
    const handleSelectResident = async (resId) => {
        try {
            setResidentId(resId);
            const { data } = await api.get("/cists/admin/select", { params: { residentId: resId } });
            const sortedCists = (data || []).sort((a, b) => new Date(b.cisDt) - new Date(a.cisDt));
            setCists(sortedCists);
        } catch (error) {
            console.error("❌ 레지던트 정보를 가져오지 못했습니다.", error);
        }
    };

    // CIST 수정
    const handleUpdateCist = async (cistId) => {
        const cist = cists.find(c => c.cisId === cistId);
        if (!cist) return;  // 방어 코드 추가
    
        // 깊은 복사하여 원본 데이터 보호
        const copiedCist = JSON.parse(JSON.stringify(cist));
    
        setCistToEdit(copiedCist);
        setIsModalOpen(true);
    };

    // 수정된 CIST 저장
    const handleSaveCist = async (updatedCist) => {
        try {
            await updateCist(updatedCist.cisId, updatedCist);
            await fetchCists();  // 데이터 새로고침
            setIsModalOpen(false);  // 모달 닫기
        } catch (error) {
            console.error("❌ CIST 수정 오류:", error);
        }
    };

    // CIST 삭제
    const handleDeleteCist = async (cistId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteCist(cistId);
            await fetchCists();  // 데이터 새로고침
        } catch (error) {
            console.error("❌ CIST 삭제 오류:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">관리자 CIST 관리</h1>
            {isLoading ? (
                <p className="text-center">⏳ 데이터를 불러오는 중...</p>
            ) : (
                <>
                    <CistAdminForm 
                        handleAddCist={handleAddCist} 
                        handleSelectResident={handleSelectResident}
                        residents={residents} 
                        latestDate={latestDate} 
                        residentId={residentId}
                    />
                    <CistAdminTable 
                        cists={cists} 
                        isAdmin={true} 
                        onUpdate={handleUpdateCist} 
                        onDelete={handleDeleteCist} 
                    />
                </>
            )}
            
            {isModalOpen && cistToEdit && (
                <CistAdminModal 
                    cist={cistToEdit} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSaveCist} 
                />
            )}
        </div>
    );
};

export default CistAdminPage;