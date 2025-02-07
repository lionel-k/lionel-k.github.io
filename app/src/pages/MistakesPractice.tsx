import { useNavigate } from "react-router-dom";
import { Exercise, LearningLesson } from "../types";
import mistakesData from "../data/mistakes.json";
import Learning from "./Learning";

const MistakesPractice = () => {
  const navigate = useNavigate();

  const learningLesson: LearningLesson = {
    id: "mistakes",
    title: "Practice Mistakes",
    subtitle: "Review and improve your learning",
    exercises: mistakesData.exercises as Exercise[],
    onComplete: () => {
      navigate("/mistakes");
    },
  };

  return <Learning lesson={learningLesson} backPath="/mistakes" />;
};

export default MistakesPractice;
