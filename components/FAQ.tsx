"use client";

import { useState } from "react";

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
    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className="py-6">
          <button
            onClick={() => toggleFAQ(index)}
            className="text-lg font-semibold mb-2 w-full text-left"
          >
            {item.question}
          </button>
          {openIndex === index && (
            <p className="text-gray-600 mt-2">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
