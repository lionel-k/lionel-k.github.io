import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import lessons from "../data/lessons.json";
import { Lesson, LearningLesson } from "../types";
import Learning from "./Learning";

const LessonLearning = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeExercise, completeLesson } = useProgress();

  const currentLesson = (lessons as Lesson[])[Number(lessonId) - 1];

  if (!currentLesson) {
    return <div>Level not found</div>;
  }

  const learningLesson: LearningLesson = {
    id: currentLesson.id,
    title: "Learn Kirundi",
    subtitle: "Master the language through interactive lessons",
    word: currentLesson.word,
    translation: currentLesson.translation,
    example: currentLesson.example,
    exampleTranslation: currentLesson.exampleTranslation,
    audioUrl: currentLesson.audioUrl,
    exercises: currentLesson.exercises,
    onComplete: () => {
      completeLesson(Number(lessonId));
      navigate(`/lesson/${lessonId}/complete`);
    },
    onExerciseComplete: (exerciseId) => {
      completeExercise(exerciseId);
    },
  };

  return <Learning lesson={learningLesson} />;
};

export default LessonLearning;
