import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";

const Givers = () => {
  const [loading, setLoading] = useState(true);
  const [givers, setGivers] = useState([]);
  const giverImage = "http://localhost:8080/userimage/";

  // 모든 요양사 엔티티 가져오기
  const getGivers = async () => {
    try {
      const { data } = await api.get("/giver/all");
      setGivers(data);
    } catch (error) {
      console.log("요양사 정보 가져오기 에러: ", error);
      toast.error("요양사 정보 가져오기 에러: ", error);
    }
    setLoading(false);
  };

  // 페이지 로딩 시 모든 요양사를 가져오는 함수를 실행
  useEffect(() => {
    setLoading(true);
    getGivers();
  }, []);

  if (loading) {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 m-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        함께 할 요양사분들을 소개합니다
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {givers.map((giver) => (
          <div
            key={giver.giverId}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`${giverImage}${giver.user.userimage}`}
              alt={giver.user.realname}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 bg-blue-100 text-center">
              <h3 className="text-lg font-semibold">{giver.user.realname}</h3>
              <p className="text-gray-600">{giver.user.email}</p>
              <p className="text-gray-600">{giver.user.phone}</p>
              <div className="flex justify-center space-x-4 my-2">
                <i className="fa fa-facebook text-blue-500">fb</i>
                <i className="fa fa-twitter text-blue-400">twitter</i>
                <i className="fa fa-linkedin text-blue-700">linkedin</i>
              </div>
              <button className="mt-4 bg-blue-900 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
                프로필 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Givers;
