import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WedLinkData } from '../data/wedlinkData';

interface FaqSectionProps {
  data: WedLinkData;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ data }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#F1EEE7] border-t border-[#E6E1D8]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B08D57]/30 text-[#24211D] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-xs font-serif font-semibold text-[#24211D]">توضيحات وإجابات</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-[#24211D] mb-3">
            {data.faq.title}
          </h2>
          <p className="text-sm text-[#716B62]">
            إجابات واضحة عن كل ما يهمك معرفته حول منصة دعوتك والدعوات الرقمية الفاخرة
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {data.faq.items.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white rounded-xl border border-[#E6E1D8] overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-4 hover:bg-[#F8F6F1] transition-colors"
                >
                  <span className="font-editorial font-bold text-sm sm:text-base text-[#24211D] flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#B08D57] shrink-0" />
                    <span>{item.q}</span>
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-[#716B62] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B08D57]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#716B62] leading-relaxed border-t border-[#E6E1D8] bg-white animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
