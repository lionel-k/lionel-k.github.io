import { useNavigate } from "react-router-dom";
import { Exercise, LearningLesson } from "../types";
import mistakesData from "../data/mistakes.json";
import Learning from "./Learning";

const MistakesPractice = () => {
  const navigate = useNavigate();

  const learningLesson: LearningLesson = {
    id: "mistakes",
    name: "Practice Mistakes",
    exercises: mistakesData.exercises as Exercise[],
    onComplete: () => {
      navigate("/mistakes");
    },
  };

  return <Learning lesson={learningLesson} backPath="/mistakes" />;
};

export default MistakesPractice;
