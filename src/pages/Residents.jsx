import { Route, Routes, useNavigate } from "react-router-dom";
import ResidentForm from "../components/resident/ResidentForm";

const Residents = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const createResident = () => {
    navigate("/resident/form"); // 버튼 클릭 시 /resident/form 경로로 이동
  };

  return (
    <div>
      <button onClick={createResident}>입소자 생성</button>
      <Routes>
        <Route path="form" element={<ResidentForm />} />
      </Routes>
    </div>
  );
};

export default Residents;
