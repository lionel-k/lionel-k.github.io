"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/learn/useAuth";
import { getUserProgress, getSectionProgress } from "@/lib/learn/progress";
import { SectionProgress } from "@/lib/learn/types";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react";

type Props = {
  language: {
    name: string;
    slug: string;
  };
};

function ProgressStats({
  sectionProgress,
}: {
  sectionProgress: SectionProgress[];
}) {
  const completed = sectionProgress.filter((s) => s.isCompleted).length;
  const total = sectionProgress.length;
  const sectionsToReview = sectionProgress.filter(
    (s) => s.percentage > 0 && s.percentage < 80
  ).length;

  // Only calculate average for sections that have been attempted (have progress in DB)
  const attemptedSections = sectionProgress.filter((s) => s.progress !== null);
  const averageScore =
    attemptedSections.length > 0
      ? Math.round(
          attemptedSections.reduce((sum, s) => sum + s.percentage, 0) /
            attemptedSections.length
        )
      : 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl">
      {/* Average Score Card */}
      <div className="group relative bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#DAA520]/30 rounded-lg p-3 hover:border-[#DAA520]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DAA520]/10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-2 bg-[#DAA520]/10 rounded-full border border-[#DAA520]/20 group-hover:bg-[#DAA520]/20 transition-colors">
            <BarChart3 className="h-4 w-4 text-[#DAA520]" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Score</p>
            <p className="text-xl font-bold text-white tracking-tight">
              {averageScore}
              <span className="text-sm text-[#DAA520]">%</span>
            </p>
            <p className="text-xs text-gray-500">
              {averageScore === 0
                ? "Start!"
                : averageScore >= 80
                  ? "Great!"
                  : averageScore >= 60
                    ? "Good!"
                    : "Keep going!"}
            </p>
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="group relative bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#DAA520]/30 rounded-lg p-3 hover:border-[#DAA520]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DAA520]/10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-2 bg-[#DAA520]/10 rounded-full border border-[#DAA520]/20 group-hover:bg-[#DAA520]/20 transition-colors">
            <CheckCircle className="h-4 w-4 text-[#DAA520]" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Completed</p>
            <p className="text-xl font-bold text-white tracking-tight">
              {completed}
              <span className="text-sm text-[#DAA520]">/{total}</span>
            </p>
            <p className="text-xs text-gray-500">
              {completed === 0
                ? "Start!"
                : `${Math.round((completed / total) * 100)}%`}
            </p>
          </div>
        </div>
      </div>

      {/* Sections to Review Card */}
      <div className="group relative bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#DAA520]/30 rounded-lg p-3 hover:border-[#DAA520]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#DAA520]/10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-2 bg-[#DAA520]/10 rounded-full border border-[#DAA520]/20 group-hover:bg-[#DAA520]/20 transition-colors">
            <XCircle className="h-4 w-4 text-[#DAA520]" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">To Review</p>
            <p className="text-xl font-bold text-white tracking-tight">
              {sectionsToReview}
            </p>
            <p className="text-xs text-gray-500">
              {attemptedSections.length === 0
                ? "None yet"
                : sectionsToReview === 0
                  ? "All done!"
                  : "< 80%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionProgressCard({
  sectionProgress,
  language,
}: {
  sectionProgress: SectionProgress;
  language: string;
}) {
  const { section, percentage, isCompleted } = sectionProgress;

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="h-4 w-4 text-[#DAA520]" />;
    if (percentage > 0) return <Clock className="h-4 w-4 text-[#DAA520]" />;
    return <div className="h-4 w-4 rounded-full border-2 border-gray-600" />;
  };

  const getStatusBorder = () => {
    if (isCompleted)
      return "border-[#DAA520]/40 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]";
    if (percentage > 0)
      return "border-[#DAA520]/30 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]";
    return "border-gray-600/30 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]";
  };

  return (
    <Link href={`/learn/${language}/${section.id}`}>
      <div
        className={`group cursor-pointer p-5 rounded-xl border ${getStatusBorder()} hover:border-[#DAA520] hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-[#DAA520]/20 shadow-lg shadow-black/20`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#DAA520]/10 rounded-full border border-[#DAA520]/20 group-hover:bg-[#DAA520]/30 group-hover:border-[#DAA520]/40 transition-all duration-300">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-[#DAA520] transition-colors duration-300">
                {section.title}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {section.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {percentage > 0 && (
              <div className="text-right">
                <p className="text-lg font-bold text-[#DAA520]">
                  {percentage}%
                </p>
                <p className="text-xs text-gray-500">
                  {isCompleted ? "Completed" : "In Progress"}
                </p>
              </div>
            )}
            <div className="text-[#DAA520] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {percentage > 0 && (
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2 group-hover:bg-gray-600 transition-colors duration-300">
              <div
                className="bg-[#DAA520] h-2 rounded-full transition-all duration-500 group-hover:bg-[#B8860B]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 group-hover:text-[#DAA520] transition-colors duration-300 font-medium">
            {percentage > 0 ? "Practice Again" : "Start Learning"}
          </p>
          <div className="flex items-center gap-1 text-[#DAA520] opacity-60 group-hover:opacity-100 transition-all duration-300">
            <span className="text-xs font-medium">Go</span>
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProgressClient({ language }: Props) {
  const { email, isLoading } = useAuth();
  const [sectionProgress, setSectionProgress] = useState<SectionProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (email) {
        try {
          const userProgress = await getUserProgress(email, language.slug);
          const progress = getSectionProgress(userProgress);
          setSectionProgress(progress);
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      }
      setLoading(false);
    };

    if (!isLoading) {
      fetchProgress();
    }
  }, [email, language.slug, isLoading]);

  if (isLoading || loading) {
    return <Loader />;
  }

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: language.name, href: `/learn/${language.slug}` },
    { name: "Progress", href: `/learn/${language.slug}/progress` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Progress</h1>
          <p className="text-gray-400">
            Track your learning journey in {language.name}
          </p>
        </div>

        <ProgressStats sectionProgress={sectionProgress} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionProgress.map((progress) => (
            <SectionProgressCard
              key={progress.section.id}
              sectionProgress={progress}
              language={language.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
