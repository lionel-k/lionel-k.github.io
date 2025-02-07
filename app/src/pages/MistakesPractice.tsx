import { useNavigate } from "react-router-dom";
import { LearningSession } from "../types";
import mistakesData from "../data/mistakes.json";
import Learning from "./Learning";

const MistakesPractice = () => {
  const navigate = useNavigate();

  const session: LearningSession = {
    id: "mistakes",
    title: "Practice Mistakes",
    subtitle: "Review and improve your learning",
    exercises: mistakesData.exercises,
    onComplete: () => {
      navigate("/mistakes");
    },
  };

  return <Learning session={session} backPath="/mistakes" />;
};

export default MistakesPractice;
