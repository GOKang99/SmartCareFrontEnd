import axios from "axios";

//백엔드 주소
//react create와는 다르게 vite에서는 env변수를 'import.meta.env.REACT_APP_API_URL' 이렇게 가져온다
console.log("API URL:", import.meta.env.VITE_API_URL);

// axios 객체 생성(기본주소), 서버와 통신
const imageApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    // "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  withCredentials: true,
});

//서버로 요청을 보내기 전에 Axios 인터셉터로 jwt 토큰을 가져와 헤더에 설정
imageApi.interceptors.request.use(
  //config는 요청을 보낼때 사용되는 설정객체
  async (config) => {
    //로컬스토리지에서 jwt토큰 가져오기
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      //헤더의 Authorization에 토큰 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default imageApi;
