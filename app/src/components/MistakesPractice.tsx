import { useNavigate } from "react-router-dom";
import Learning from "../pages/Learning";
import { LearningSession, Exercise } from "../types";

const mistakesExercises: Exercise[] = [
  {
    id: 1,
    lessonId: 1,
    lessonName: "Greetings",
    date: "2024-03-15T10:30:00Z",
    type: "word-chips",
    question: "Translate 'Good morning' to Kirundi",
    correctAnswer: "Mwaramutse neza",
    wordChips: ["Mwaramutse", "neza", "mwese", "kare"],
    audioUrl: "/audio/good-morning.mp3",
  },
  {
    id: 2,
    lessonId: 2,
    lessonName: "Basic Phrases",
    date: "2024-03-16T14:20:00Z",
    type: "multiple-choice",
    question: "What does 'Amakuru' mean?",
    correctAnswer: "How are you?",
    options: ["How are you?", "Good morning", "Good evening", "Goodbye"],
  },
  {
    id: 3,
    lessonId: 3,
    lessonName: "Common Phrases",
    date: "2024-03-17T09:15:00Z",
    type: "fill-blank",
    question: "Complete the sentence: '___ ni mwiza' (The day is good)",
    correctAnswer: "Umunsi",
  },
];

export const MistakesPractice = () => {
  const navigate = useNavigate();

  const session: LearningSession = {
    id: "mistakes",
    title: "Practice Mistakes",
    subtitle: "Review and improve",
    exercises: mistakesExercises,
    onComplete: () => {
      navigate("/mistakes");
    },
  };

  return <Learning session={session} backPath="/mistakes" />;
};
