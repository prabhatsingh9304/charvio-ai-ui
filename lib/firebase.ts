import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAMWhG6mxICsw-UuekKPNhPIr1kzDZ28Mw",
  authDomain:
    typeof window !== "undefined"
      ? window.location.host
      : "waspx-e55b2.firebaseapp.com",
  projectId: "waspx-e55b2",
  storageBucket: "waspx-e55b2.firebasestorage.app",
  messagingSenderId: "374698925814",
  appId: "1:374698925814:web:566feec88b07b93b7e56d7",
  measurementId: "G-SCHXXZWZFP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;