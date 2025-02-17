import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // 백엔드 서버 URL (환경 변수로 관리할 수 있음)
  timeout: 5000,
});

export default api;
