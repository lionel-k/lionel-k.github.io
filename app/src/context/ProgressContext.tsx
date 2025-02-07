import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProgress } from "../types";

interface ProgressContextType {
  progress: UserProgress;
  completeLesson: (lessonId: number) => void;
  completeExercise: (exerciseId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState<UserProgress>({
    completedLevels: [],
    currentLevel: 1,
    exercises: {},
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const completeLesson = (lessonId: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        completedLevels: [...new Set([...prev.completedLevels, lessonId])],
        currentLevel: lessonId + 1,
      };
      localStorage.setItem("progress", JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const completeExercise = (exerciseId: string) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        exercises: { ...prev.exercises, [exerciseId]: true },
      };
      localStorage.setItem("progress", JSON.stringify(newProgress));
      return newProgress;
    });
  };

  return (
    <ProgressContext.Provider
      value={{ progress, completeLesson, completeExercise }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
