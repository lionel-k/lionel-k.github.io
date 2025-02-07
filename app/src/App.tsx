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
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
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
              path="/lessons"
              element={
                <PrivateRoute>
                  <Lessons />
                </PrivateRoute>
              }
            />
            <Route
              path="/lesson/:lessonId"
              element={
                <PrivateRoute>
                  <Learning />
                </PrivateRoute>
              }
            />
            <Route
              path="/lesson/:lessonId/complete"
              element={
                <PrivateRoute>
                  <LevelComplete />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/mistakes"
              element={
                <PrivateRoute>
                  <Lessons />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
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
