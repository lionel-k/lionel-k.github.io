import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Lessons from "./pages/Lessons";
import LessonLearning from "./pages/LessonLearning";
import LessonComplete from "./pages/LessonComplete";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Mistakes from "./pages/Mistakes";
import MistakesPractice from "./pages/MistakesPractice";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
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
                  <LessonLearning />
                </PrivateRoute>
              }
            />
            <Route
              path="/lesson/:lessonId/complete"
              element={
                <PrivateRoute>
                  <LessonComplete />
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
                  <Mistakes />
                </PrivateRoute>
              }
            />
            <Route
              path="/practice/mistakes"
              element={
                <PrivateRoute>
                  <MistakesPractice />
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
