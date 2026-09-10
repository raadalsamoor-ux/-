import React from 'react';
import { Check, Wand2 } from 'lucide-react';
import { WedLinkData } from '../data/wedlinkData';

interface StepsSectionProps {
  data: WedLinkData;
  onOrderClick: () => void;
}

export const StepsSection: React.FC<StepsSectionProps> = ({ data, onOrderClick }) => {
  return (
    <section id="steps" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#F1EEE7] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B08D57]/30 text-[#24211D] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-xs font-serif font-semibold text-[#24211D]">سهولة الإعداد والسرعة</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-[#24211D] mb-3">
            {data.steps.title}
          </h2>
          <p className="text-sm sm:text-base text-[#716B62]">
            ثلاث خطوات ميسّرة تفصلك عن دعوتك الإلكترونية الفاخرة
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {data.steps.items.map((step, idx) => (
            <div
              key={idx}
              id={`step-card-${idx + 1}`}
              className="bg-white p-6 sm:p-7 rounded-xl border border-[#E6E1D8] shadow-2xs hover:shadow-md transition-all duration-200 relative group flex flex-col justify-between"
            >
              {/* Step indicator number */}
              <div className="flex items-center justify-between mb-5">
                <span className="w-9 h-9 rounded-lg bg-[#29251F] text-[#D6BE91] border border-[#B08D57]/30 flex items-center justify-center font-serif font-bold text-sm">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#716B62] font-medium">
                  STEP 0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-editorial font-bold text-lg text-[#24211D] mb-2.5 group-hover:text-[#B08D57] transition-colors">
                  {step.h}
                </h3>
                <p className="text-xs sm:text-sm text-[#716B62] leading-relaxed">
                  {step.p}
                </p>
              </div>

              {/* Bottom line accent */}
              <div className="mt-6 pt-4 border-t border-[#E6E1D8] flex items-center gap-1.5 text-xs text-[#B08D57] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>
                  {idx === 0
                    ? 'تصفح التصاميم الملكية المعروضة'
                    : idx === 1
                    ? 'إدخال البيانات والتوليد الفوري'
                    : 'تسليم فوري ومشاركة غير محدودة'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Design Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-[#E6E1D8] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-right">
            <h4 className="font-editorial font-bold text-lg text-[#24211D]">
              هل لديك فكرة أو طلب تصميم مخصص بالكامل؟
            </h4>
            <p className="text-xs sm:text-sm text-[#716B62] mt-1">
              يسعد فريق منصة دعوتك بتنفيذ تصاميم حصرية خاصة ومطابقة لألوان قاعتكم وهوية مناسبتكم.
            </p>
          </div>

          <button
            onClick={onOrderClick}
            className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all flex items-center gap-2 border border-[#B08D57]/30"
          >
            <Wand2 className="w-4 h-4 text-[#D6BE91]" />
            <span>ابدأ الآن واستفسر</span>
          </button>
        </div>
      </div>
    </section>
  );
};
