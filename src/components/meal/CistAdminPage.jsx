import React, { useEffect, useState, useCallback } from "react";
import { getAllCistsForAdmin, addCist, updateCist, deleteCist, getResidents } from "../../services/CistService";
import api from "../../services/api";
import CistAdminForm from "./CistAdminForm";
import CistAdminTable from "./CistAdminTable";
import CistAdminModal from "./CistAdminModal";

const CistAdminPage = () => {
    const [cists, setCists] = useState([]);
    const [residents, setResidents] = useState([]); // 레지던트 목록 상태
    const [residentId, setResidentId] = useState("0"); // 선택된 레지던트 ID (문자열로 초기화)
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 (하나로 통합)
    const [latestDate, setLatestDate] = useState(""); // 최신 날짜
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
    const [cistToEdit, setCistToEdit] = useState(null); // 수정할 CIST 데이터
    console.log("시츄의 위치는",cists);
    // ✅ DB데이터 모든 정보 불러오기
    const fetchCists = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllCistsForAdmin();
            const getRes = await getResidents();
            setResidents(getRes);

            // residentId에 따라 필터링 및 정렬
            let sortedCists = (data || []).sort((a, b) => new Date(b.cisDt) - new Date(a.cisDt));
            if (residentId !== "0") {
                sortedCists = sortedCists.filter(cist => cist.residentId === Number(residentId));
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
    }, [residentId]); // residentId가 변경될 때마다 fetchCists 호출

    useEffect(() => {
        fetchCists();
    }, [fetchCists]);

    // CIST 추가
    const handleAddCist = async (newCist) => {
        try {
            const isDuplicate = cists.some(
                cist => cist.cisDt === newCist.cisDt && cist.residentId === Number(newCist.residentId)
            );

            if (isDuplicate) {
                alert("이 날짜의 CIST가 이미 추가되어 있습니다.");
                return;
            }

            await addCist(newCist);
            await fetchCists(); // 데이터 새로고침
        } catch (error) {
            console.error("❌ CIST 추가 오류:", error);
        }
    };

    // 레지던트 선택 처리
    const handleSelectResident = async (resId) => {
        try {
            setIsLoading(true);
            setResidentId(resId);
            const { data } = await api.get("/cist/admin/select", { params: { residentId: resId } });
            const sortedCists = (data || []).sort((a, b) => new Date(b.cisDt) - new Date(a.cisDt));
            setCists(sortedCists);
        } catch (error) {
            console.error("❌ 레지던트 정보를 가져오지 못했습니다.", error);
        } finally {
            setIsLoading(false);
        }
    };

    // CIST 수정
    const handleUpdateCist = async (cistId) => {
        const cist = cists.find(c => c.cisId === Number(cistId));
        if (!cist) return; // 방어 코드

        // 깊은 복사하여 원본 데이터 보호
        const copiedCist = JSON.parse(JSON.stringify(cist));
        setCistToEdit(copiedCist);
        setIsModalOpen(true);
    };

    // 수정된 CIST 저장
    const handleSaveCist = async (updatedCist) => {
        try {
            await updateCist(updatedCist.cisId, updatedCist);
            await fetchCists(); // 데이터 새로고침
            setIsModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error("❌ CIST 수정 오류:", error);
        }
    };

    // CIST 삭제
    const handleDeleteCist = async (cistId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteCist(cistId);
            await fetchCists(); // 데이터 새로고침
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
                    {!isLoading && (
                        <CistAdminTable
                            cists={cists}
                            isAdmin={true}
                            onUpdate={handleUpdateCist}
                            onDelete={handleDeleteCist}
                        />
                    )}
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