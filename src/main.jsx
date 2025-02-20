import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./ContextApi.jsx";

createRoot(document.getElementById("root")).render(
  //컨텍스트 프로바이더로 App컴포넌트 감싸기
  <ContextProvider>
    <App />
  </ContextProvider>
);
