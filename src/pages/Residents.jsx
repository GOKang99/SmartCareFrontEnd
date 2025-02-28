import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation();

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
      console("입소자목록: ", result.data);
    } catch (error) {
      console.log("에러 발생", error);
    }
  };

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

  useEffect(() => {
    loadResident();
  }, []);

  const createResident = () => {
    if (location.pathname === "/resident/form") {
      navigate("/resident"); // 이미 /resident/form일 때는 메인 화면으로 이동
    } else {
      navigate("/resident/form"); // 그 외에는 /resident/form으로 이동
    }
  };

  const showListResident = () => {
    if (location.pathname === "/resident/list") {
      navigate("/resident");
    } else {
      navigate("/resident/list");
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <div className="flex flex-col items-center justify-center space-y-6 py-10">
        <div className="flex space-x-4">
          <button
            onClick={createResident}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            입소자 등록
          </button>

          <button
            onClick={showListResident}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            입소자 리스트
          </button>
        </div>

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
