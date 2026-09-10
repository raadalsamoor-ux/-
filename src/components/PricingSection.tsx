import React from 'react';
import { Check, MessageCircle, ArrowLeft } from 'lucide-react';
import { PACKAGES, PackageTier, WedLinkData } from '../data/wedlinkData';

interface PricingSectionProps {
  data: WedLinkData;
  onSelectPackage: (pkg: PackageTier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ data, onSelectPackage }) => {
  const whatsappHref = `https://wa.me/${data.brand.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('مرحباً منصة دعوتك 👋 أود الاستفسار عن باقات وأسعار الدعوات الإلكترونية الفاخرة.')}`;

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F1] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B08D57]/30 text-[#24211D] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-xs font-serif font-semibold text-[#24211D]">باقات واضحة وشاملة</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-[#24211D] mb-3">
            {data.pricing.title}
          </h2>
          <p className="text-sm sm:text-base text-[#716B62] leading-relaxed">
            {data.pricing.text}
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative bg-white ${
                  isPopular
                    ? 'border-2 border-[#B08D57] shadow-md scale-[1.02]'
                    : 'border border-[#E6E1D8] shadow-2xs hover:shadow-sm'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-serif font-bold text-[#29251F] bg-[#D6BE91] border border-[#B08D57] shadow-xs tracking-wide">
                      الباقة الأكثر طلباً
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Price */}
                  <div className="mb-4">
                    <h3 className="font-editorial font-bold text-xl text-[#24211D]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#B08D57] font-serif tracking-wider uppercase font-semibold mt-0.5">
                      {pkg.latin}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-[#E6E1D8]">
                    <span className="font-editorial font-bold text-4xl text-[#24211D]">
                      {pkg.priceJod}
                    </span>
                    <span className="text-xs text-[#716B62]">دينار أردني (شامل كل شيء)</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#716B62] leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#24211D]">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                        <span className="text-[#24211D]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <div>
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#29251F] text-white hover:bg-[#1A1814] active:scale-[0.98] border border-[#B08D57]/40'
                        : 'bg-white text-[#24211D] border border-[#E6E1D8] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    <span>اختيار وتصميم هذه الباقة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Design Banner */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E1D8] shadow-2xs max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#716B62] text-right">
            لديك ثيم خاص في بطاقة ورقية أو تصميم في خيالك؟
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#24211D] bg-[#F1EEE7] border border-[#E6E1D8] hover:bg-[#E6E1D8] transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#B08D57]" />
            <span>{data.pricing.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
