// Firebase 설정 파일
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 정보
// 실제 프로젝트에 맞게 수정해야 합니다
const firebaseConfig = {
  apiKey: "AIzaSyB_7NuCaDGNFbORyW07xZ4CS1S7Q6cag_U",
  authDomain: "router3-fire.firebaseapp.com",
  projectId: "router3-fire",
  storageBucket: "router3-fire.firebasestorage.app",
  messagingSenderId: "841540683433",
  appId: "1:841540683433:web:603c1acd7a10bf8b458bb8",
  measurementId: "G-LHK9PTMPQ0",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 초기화
export const db = getFirestore(app);
export default app;
