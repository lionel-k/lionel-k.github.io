import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Login from "./pages/Login";
import Lessons from "./pages/Lessons";
import Learning from "./pages/Learning";
import LevelComplete from "./pages/LevelComplete";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Lessons />
                </PrivateRoute>
              }
            />
            <Route
              path="/level/:levelId"
              element={
                <PrivateRoute>
                  <Learning />
                </PrivateRoute>
              }
            />
            <Route
              path="/level/:levelId/complete"
              element={
                <PrivateRoute>
                  <LevelComplete />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
