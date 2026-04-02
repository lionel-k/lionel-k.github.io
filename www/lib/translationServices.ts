import { LANGUAGES } from "./constants";

export const CTA_EMAIL = "hello@lingu.africa";

export const translationLanguages = LANGUAGES.filter((l) => !l.comingSoon);

export function getTranslationFaqs(name: string) {
  return [
    {
      question: `Do you offer ${name} to English translation?`,
      answer:
        "Yes, depending on project type and availability. Contact us with your project details to get a quote.",
    },
    {
      question: `Do you translate documents from ${name} to English?`,
      answer:
        "Yes. We can help with different document types. Share your file and project details at hello@lingu.africa to get started.",
    },
    {
      question: `Do you translate audio and video from ${name}?`,
      answer:
        "Yes. Share the file details and we will review the project. We work with freelance language partners who can help with audio and video files.",
    },
    {
      question: `Can you provide subtitles for ${name} video content?`,
      answer:
        "Yes, for supported video projects. Include the video duration and format in your email so we can review the request.",
    },
    {
      question: `How do I get a quote for ${name} translation?`,
      answer:
        "Email hello@lingu.africa with the details of your project. Include the language, file type, number of pages or audio/video duration, and your deadline.",
    },
  ];
}
