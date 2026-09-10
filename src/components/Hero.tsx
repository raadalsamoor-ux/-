import React from 'react';
import { ArrowLeft, MessageCircle, Eye, Wand2, MapPin, CheckCircle2 } from 'lucide-react';
import { DesignItem, WedLinkData } from '../data/wedlinkData';

interface HeroProps {
  data: WedLinkData;
  onSelectDesign: (design: DesignItem) => void;
  onOrderClick: () => void;
  onOpenBuilder?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onSelectDesign, onOrderClick, onOpenBuilder }) => {
  // Find the fan designs
  const fanDesigns = data.hero.fan
    .map(slug => data.designs.find(d => d.slug === slug))
    .filter(Boolean) as DesignItem[];

  const mainFeatured = fanDesigns[1] || fanDesigns[0] || data.designs[0];
  const sideLeft = fanDesigns[0] || data.designs[1];
  const sideRight = fanDesigns[2] || data.designs[2];

  const whatsappHref = `https://wa.me/${data.brand.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(data.brand.hello)}`;

  return (
    <section id="hero-section" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Editorial Copy & Value Proposition */}
          <div className="lg:col-span-6 text-right z-10">
            {/* Studio Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EEE7] border border-[#B08D57]/30 text-[#24211D] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
              <span className="text-xs font-serif tracking-wide text-[#24211D]">
                دعوات إلكترونية فاخرة · منصة دعوتك
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#24211D] leading-[1.3] mb-5">
              {data.hero.title}
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-[#716B62] leading-relaxed mb-8 max-w-xl">
              {data.hero.lead}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {onOpenBuilder && (
                <button
                  id="hero-cta-builder"
                  onClick={onOpenBuilder}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all shadow-sm border border-[#B08D57]/40"
                >
                  <Wand2 className="w-4 h-4 text-[#D6BE91]" />
                  <span>صمّم دعوتك بنفسك فوراً</span>
                </button>
              )}

              <a
                id="hero-cta-collection"
                href="#collection"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-[#24211D] bg-white border border-[#E6E1D8] hover:bg-[#F1EEE7] active:scale-[0.98] transition-all shadow-2xs"
              >
                <span>{data.hero.cta1}</span>
                <ArrowLeft className="w-4 h-4 text-[#716B62]" />
              </a>

              <a
                id="hero-cta-whatsapp"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#B08D57]" />
                <span>{data.hero.cta2}</span>
              </a>
            </div>

            {/* Minimalist Facts Row */}
            <div className="pt-6 border-t border-[#E6E1D8] grid grid-cols-3 gap-4">
              <div>
                <span className="block font-editorial font-bold text-xl text-[#24211D]">100%</span>
                <span className="text-xs text-[#716B62]">تجهيز فوري مستقل</span>
              </div>
              <div>
                <span className="block font-editorial font-bold text-xl text-[#24211D]">13+</span>
                <span className="text-xs text-[#716B62]">تصميماً عربياً فاخراً</span>
              </div>
              <div>
                <span className="block font-editorial font-bold text-xl text-[#24211D]">RSVP</span>
                <span className="text-xs text-[#716B62]">تأكيد حضور عبر واتساب</span>
              </div>
            </div>
          </div>

          {/* Left Column: Visual Invitation Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px] h-[480px] sm:h-[530px] flex items-center justify-center">
              
              {/* Left Backing Card */}
              {sideLeft && (
                <div
                  id={`hero-card-left-${sideLeft.slug}`}
                  onClick={() => onSelectDesign(sideLeft)}
                  className="absolute right-6 sm:right-10 top-12 w-[160px] sm:w-[195px] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border border-[#E6E1D8] bg-white shadow-sm -rotate-6 transition-all duration-300 hover:-rotate-3 hover:scale-105 z-10 group"
                  title={`معاينة: ${sideLeft.name}`}
                >
                  <img
                    src={sideLeft.thumb}
                    alt={sideLeft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/70 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-2.5 inset-x-2 text-center">
                    <span className="inline-block text-[11px] font-medium text-white px-2 py-0.5 rounded bg-[#29251F]/80 backdrop-blur-sm">
                      {sideLeft.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Right Backing Card */}
              {sideRight && (
                <div
                  id={`hero-card-right-${sideRight.slug}`}
                  onClick={() => onSelectDesign(sideRight)}
                  className="absolute left-6 sm:left-10 top-16 w-[160px] sm:w-[195px] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border border-[#E6E1D8] bg-white shadow-sm rotate-6 transition-all duration-300 hover:rotate-3 hover:scale-105 z-10 group"
                  title={`معاينة: ${sideRight.name}`}
                >
                  <img
                    src={sideRight.thumb}
                    alt={sideRight.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/70 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-2.5 inset-x-2 text-center">
                    <span className="inline-block text-[11px] font-medium text-white px-2 py-0.5 rounded bg-[#29251F]/80 backdrop-blur-sm">
                      {sideRight.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Main Smartphone Showcase Mockup */}
              {mainFeatured && (
                <div
                  id={`hero-card-main-${mainFeatured.slug}`}
                  onClick={() => onSelectDesign(mainFeatured)}
                  className="relative z-20 w-[210px] sm:w-[245px] aspect-[9/18.5] bg-white rounded-[36px] p-2.5 border-[4px] border-[#29251F] shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] group"
                >
                  {/* Speaker & camera notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#29251F] rounded-full z-30" />

                  {/* Phone Screen Frame */}
                  <div className="w-full h-full rounded-[26px] overflow-hidden relative bg-[#F8F6F1] flex flex-col justify-between">
                    <img
                      src={mainFeatured.thumb}
                      alt={mainFeatured.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Bottom overlay inside phone */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#24211D]/95 via-[#24211D]/60 to-transparent text-center">
                      <p className="text-[12px] font-bold text-white mb-0.5">
                        {mainFeatured.name}
                      </p>
                      <p className="text-[10px] text-[#D6BE91] mb-2 font-serif">
                        {mainFeatured.latin}
                      </p>
                      <div className="inline-flex items-center gap-1 text-[10px] text-[#24211D] bg-[#D6BE91] px-2.5 py-1 rounded-md font-semibold">
                        <Eye className="w-3 h-3" />
                        <span>معاينة حية للمدعوين</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Editorial Floating Info Badges */}
              <div className="absolute -bottom-2 right-2 sm:right-8 z-30 bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2 shadow-sm flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F1EEE7] flex items-center justify-center text-[#B08D57]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#24211D]">تأكيد حضور ذكي</p>
                  <p className="text-[10px] text-[#716B62]">إشعارات فورية عبر واتساب</p>
                </div>
              </div>

              <div className="absolute -top-2 left-2 sm:left-6 z-30 bg-white border border-[#E6E1D8] rounded-xl px-3.5 py-2 shadow-sm flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F1EEE7] flex items-center justify-center text-[#B08D57]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#24211D]">ملاحة Google Maps</p>
                  <p className="text-[10px] text-[#716B62]">توجيه ضيوف الحفل للقاعة</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Brand Facts Strip Under Hero */}
        <div className="mt-14 pt-8 border-t border-[#E6E1D8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#716B62]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>متوافق تماماً مع جميع الهواتف والمتصفحات</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>فتح الظرف الملكي بتأثير فتح تفاعلي</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>روابط خاصة بأسماء المدعوين للتخصيص</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span>رمز QR عالي الدقة جاهز للطباعة</span>
          </div>
        </div>

      </div>
    </section>
  );
};
