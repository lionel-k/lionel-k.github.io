import { useNavigate } from "react-router-dom";
import { LearningLesson } from "../types";
import mistakesData from "../data/mistakes.json";
import Learning from "./Learning";

const MistakesPractice = () => {
  const navigate = useNavigate();

  const learningLesson: LearningLesson = {
    id: "mistakes",
    title: "Practice Mistakes",
    subtitle: "Review and improve your learning",
    exercises: mistakesData.exercises,
    onComplete: () => {
      navigate("/mistakes");
    },
  };

  return <Learning lesson={learningLesson} backPath="/mistakes" />;
};

export default MistakesPractice;
