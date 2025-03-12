import { Route, Routes } from "react-router-dom";
import ResidentForm from "../components/resident/ResidentForm";
import ResidentList from "../components/resident/ResidentList";
import ResidentItem from "../components/resident/ResidentItem";
import ResidentEdit from "../components/resident/ResidentEdit";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import imageApi from "../services/imageApi";

const Residents = () => {
  const { token } = useMyContext();
  const detoken = jwtDecode(token);
  const giverId = detoken.partId;

  const [residents, setResidents] = useState([]);

  const handleNewResident = (newResident) => {
    setResidents((prevResidents) => [...prevResidents, newResident]);
  };

  const handleEditResident = (updatedResident) => {
    setResidents((prevResidents) =>
      prevResidents.map((resident) =>
        resident.resId === updatedResident.resId
          ? { ...resident, ...updatedResident }
          : resident
      )
    );
  };

  const loadResident = async () => {
    try {
      const result = await imageApi.get("http://localhost:8080/api/resident");
      setResidents(result.data);
      console.log("입소자목록: ", result.data);
    } catch (error) {
      console.log("에러 발생", error);
    }
  };

  useEffect(() => {
    loadResident();
  }, []);

  const deleteResident = async (resId) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        // 삭제 API 호출
        await imageApi.delete(`http://localhost:8080/api/resident/${resId}`);

        // 삭제 후 상태에서 해당 입소자 제거
        setResidents(residents.filter((resident) => resident.resId !== resId));

        alert("입소자가 삭제되었습니다.");
      } catch (error) {
        console.log("삭제 오류:", error);
        alert("삭제에 실패했습니다.");
      }
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <div className="flex flex-col items-center justify-center space-y-6 py-10">
        <Routes>
          <Route
            path="/form"
            element={
              <ResidentForm
                handleNewResident={handleNewResident}
                giverId={giverId}
              />
            }
          />

          <Route
            path="/list"
            element={
              <ResidentList
                residents={residents}
                deleteResident={deleteResident}
              />
            }
          />

          <Route path="/list/:id" element={<ResidentItem />} />

          <Route
            path="/edit/:id"
            element={
              <ResidentEdit
                handleEditResident={handleEditResident}
                giverId={giverId}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Residents;
