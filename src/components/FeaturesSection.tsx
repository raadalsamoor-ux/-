import React from 'react';
import {
  Clock,
  ListOrdered,
  MapPin,
  CheckCircle2,
  UserCheck,
  Music,
  CalendarPlus,
  HeartHandshake
} from 'lucide-react';
import { WedLinkData } from '../data/wedlinkData';

interface FeaturesSectionProps {
  data: WedLinkData;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ data }) => {
  const iconMap: Record<string, React.ReactNode> = {
    clock: <Clock className="w-5 h-5 text-[#B08D57]" />,
    list: <ListOrdered className="w-5 h-5 text-[#B08D57]" />,
    pin: <MapPin className="w-5 h-5 text-[#B08D57]" />,
    check: <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />,
    card: <UserCheck className="w-5 h-5 text-[#B08D57]" />,
    music: <Music className="w-5 h-5 text-[#B08D57]" />,
  };

  // 8 features
  const allFeatures = [
    ...data.features.items,
    {
      icon: 'calendar',
      h: 'إضافة للتقويم الذكي',
      p: 'زر بنقرة واحدة يضيف موعد الحفل وتفاصيل القاعة إلى تقويم هواتف الضيوف مع تنبيه تلقائي.'
    },
    {
      icon: 'wishes',
      h: 'حائط التهاني الرقمي',
      p: 'مساحة عاطفية أنيقة تتيح للأحباب كتابة تبريكاتهم وكلماتهم الصادقة للعروسين.'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F1] border-t border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B08D57]/30 text-[#24211D] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-xs font-serif font-semibold text-[#24211D]">تجربة تفاعلية متكاملة</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-[#24211D] mb-3">
            {data.features.title}
          </h2>
          <p className="text-sm sm:text-base text-[#716B62] leading-relaxed">
            {data.features.sub}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {allFeatures.map((item, idx) => {
            const icon = iconMap[item.icon] || (
              item.icon === 'calendar' ? <CalendarPlus className="w-5 h-5 text-[#B08D57]" /> : <HeartHandshake className="w-5 h-5 text-[#B08D57]" />
            );

            return (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                className="bg-white p-6 rounded-xl border border-[#E6E1D8] shadow-2xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#F1EEE7]">
                    {icon}
                  </div>

                  <h3 className="font-editorial font-bold text-base text-[#24211D] mb-2 group-hover:text-[#B08D57] transition-colors">
                    {item.h}
                  </h3>

                  <p className="text-xs text-[#716B62] leading-relaxed">
                    {item.p}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
