"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <div
            key={index}
            className="border border-gray-200/20 rounded-lg bg-[#1A1A1A] shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full px-4 py-3 text-left focus:outline-none"
            >
              <span className="text-base font-semibold text-white">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-[#DAA520] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated answer container */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 px-4 pb-4" : "max-h-0 px-4 pb-0"
              }`}
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
