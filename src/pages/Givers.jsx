import React, { useEffect, useState } from "react";
import GiverCard from "./GiverCard";
import api from "../services/api";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";

const Givers = () => {
  const [loading, setLoading] = useState(true);
  const [givers, setGivers] = useState([]);
  const giverImage = "http://localhost:8080/userimage/";

  //모든 요양사 엔티티 가져오기
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

  //페이지 로딩 시 모든 요양사를 가져오는 함수를 한 번 실행한다
  useEffect(() => {
    setLoading(true); //로딩상태를 true 세팅
    getGivers(); //모든 요양사를 가져오는 함수를 실행하며 해당 함수가 끝나면 로딩의 상태는 false로 바뀌면서 요양사 리스트가 화면에 표시된다
  }, []);

  //로딩상태가 false일 경우
  if (!loading) {
    return (
      <div className="p-4 w-[60%] m-auto">
        <h2 className="text-xl font-semibold mb-4">
          함께 할 요양사분들을 소개합니다
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {givers.map((giver) => {
            return (
              <>
                <GiverCard
                  userImage={`${giverImage}${giver.user.userimage}`}
                  name={giver.user.realname}
                  email={giver.user.email}
                  phone={giver.user.phone}
                />
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  }
};

export default Givers;
