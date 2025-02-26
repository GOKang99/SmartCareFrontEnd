import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ResidentForm from "../components/resident/ResidentForm";
import ResidentList from "../components/resident/ResidentList";
import ResidentItem from "../components/resident/ResidentItem";
import ResidentEdit from "../components/resident/ResidentEdit";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";

const Residents = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation();

  const { token } = useMyContext();

  const detoken = jwtDecode(token);

  const giverId = detoken.partId;

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
          <Route path="/form" element={<ResidentForm giverId={giverId} />} />
          <Route path="/list" element={<ResidentList />} />
          <Route path="/list/:id" element={<ResidentItem />} />
          <Route
            path="/edit/:id"
            element={<ResidentEdit giverId={giverId} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Residents;
