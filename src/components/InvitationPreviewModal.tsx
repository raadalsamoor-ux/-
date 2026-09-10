import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Smartphone,
  Sliders,
  Check,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { DesignItem, CreatedInvitation, formatWhatsAppOrderUrl } from '../data/wedlinkData';
import { getTemplate } from '../templates/templateRegistry';

interface InvitationPreviewModalProps {
  design: DesignItem | null;
  onClose: () => void;
  onOrder: (design: DesignItem, customNames?: { groom: string; bride: string }) => void;
  whatsappNumber: string;
}

export const InvitationPreviewModal: React.FC<InvitationPreviewModalProps> = ({
  design,
  onClose,
  onOrder,
  whatsappNumber
}) => {
  if (!design) return null;

  // Envelope state
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Live customizable details
  const defaultInvite = design.sampleInvite || {
    groom: 'أنس',
    bride: 'راما',
    eventType: 'wedding',
    eventTitle: 'حفل زفاف مبارك',
    dateText: 'الجمعة، ٢٤ أكتوبر ٢٠٢٦',
    hijriDate: '١٣ ربيع الثاني ١٤٤٨ هـ',
    timeText: 'الساعة ٧:٣٠ مساءً',
    hall: 'فندق الفورسيزونز · قاعة الثريا',
    city: 'عمّان، الأردن',
    quran: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    invitationNote: 'بكل مشاعر الود والبهجة، يسعدنا ويشرفنا دعوتكم لمشاركتنا فرحتنا، وبحضوركم تكتمل مسرتنا.'
  };

  const [customGroom, setCustomGroom] = useState(defaultInvite.groom);
  const [customBride, setCustomBride] = useState(defaultInvite.bride);
  const [customHall, setCustomHall] = useState(defaultInvite.hall);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // RSVP state inside preview
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishes state inside preview
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; text: string; time: string }>>([
    { id: '1', name: 'عائلة الخال أبو أحمد', text: 'ألف ألف مبارك، جمع الله بينكما في خير وسعادة وبارك لكما.', time: 'منذ ساعتين' },
    { id: '2', name: 'د. سامر وعائلته', text: 'مبارك الفرحة الكبرى، متشوقون للحضور ومشاركتكم أسعد اللحظات.', time: 'منذ ٥ ساعات' }
  ]);

  useEffect(() => {
    // Reset state on design change
    setIsOpened(false);
    setIsPlayingMusic(false);
    setRsvpSubmitted(false);
    setCustomGroom(defaultInvite.groom);
    setCustomBride(defaultInvite.bride);
    setCustomHall(defaultInvite.hall);
  }, [design.slug]);

  // Audio setup
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1025.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleOpenEnvelope = () => {
    const nextState = !isOpened;
    setIsOpened(nextState);

    if (nextState && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleRsvpSubmit = (name: string, attending: boolean, count: number, note?: string) => {
    setRsvpSubmitted(true);
  };

  const handleAddWish = (name: string, text: string) => {
    setWishes(prev => [
      { id: String(Date.now()), name, text, time: 'الآن' },
      ...prev
    ]);
  };

  // Get matching template from registry
  const templateDef = getTemplate(design.templateId, design.slug);
  const TemplateComponent = templateDef.Component;

  // Construct temporary preview invitation object
  const previewInvitation: CreatedInvitation = {
    id: `preview-${design.slug}`,
    createdAt: new Date().toISOString(),
    templateId: templateDef.templateId,
    designSlug: design.slug,
    designName: design.name,
    eventType: (design.cat as 'wedding' | 'henna' | 'grad') || 'wedding',
    eventTitle: defaultInvite.eventTitle,
    groom: customGroom || defaultInvite.groom,
    bride: customBride,
    hostsNote: 'نتشرف بدعوتكم لحضور حفلنا المبارك',
    quranVerse: defaultInvite.quran,
    invitationNote: defaultInvite.invitationNote,
    dateText: defaultInvite.dateText,
    hijriDate: defaultInvite.hijriDate,
    timeText: defaultInvite.timeText,
    eventDateIso: '2026-10-24T19:30:00',
    hall: customHall || defaultInvite.hall,
    city: defaultInvite.city,
    googleMapsUrl: 'https://maps.google.com/?q=Amman+Jordan',
    program: [
      { id: '1', time: '٧:٣٠ م', title: 'استقبال الضيوف الكرام' },
      { id: '2', time: '٨:١٥ م', title: 'دخول العروسين والزفة' },
      { id: '3', time: '٩:٣٠ م', title: 'العشاء والحلويات' },
      { id: '4', time: '١٠:٣٠ م', title: 'التقاط الصور التذكارية' }
    ],
    hasMusic: true,
    hasCountdown: true,
    hasRsvp: true,
    hasWishesWall: true
  };

  const whatsappDirectOrderUrl = formatWhatsAppOrderUrl({
    designName: design.name,
    designSlug: design.slug,
    packageType: 'gold',
    groomOrHostName: customGroom,
    brideName: customBride,
    hallName: customHall
  }, whatsappNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#20201E]/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[92vh] bg-[#F8F6F1] rounded-2xl shadow-2xl border border-[#E6E1D8] flex flex-col md:flex-row overflow-hidden">
        
        {/* Left / Top Controls & Details Panel */}
        <div className="w-full md:w-80 lg:w-96 p-5 border-b md:border-b-0 md:border-l border-[#E6E1D8] flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-4">
            {/* Header with Title & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B08D57]">
                  {templateDef.latinName}
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#24211D]">
                  {design.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template description badge */}
            <p className="text-xs text-[#716B62] leading-relaxed">
              {templateDef.description}
            </p>

            {/* Color Palette Indicators */}
            <div>
              <span className="text-[11px] text-[#716B62] block mb-1.5 font-medium">لوحة الألوان المعتمدة للتصميم:</span>
              <div className="flex items-center gap-2">
                {templateDef.palette.map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Live Interactive Customizer Accordion */}
            <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="w-full flex items-center justify-between text-xs font-semibold text-[#24211D]"
              >
                <span className="flex items-center gap-1.5 text-[#24211D]">
                  <Sliders className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>جرّب أسماءكم مباشرة على التصميم</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-[#716B62] transition-transform ${showCustomizer ? 'rotate-180' : ''}`} />
              </button>

              {showCustomizer && (
                <div className="mt-3 space-y-2.5 pt-2 border-t border-[#E6E1D8]">
                  <div>
                    <label className="block text-[10px] text-[#716B62] mb-1">اسم العريس أو صاحب الدعوة</label>
                    <input
                      type="text"
                      value={customGroom}
                      onChange={(e) => setCustomGroom(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E6E1D8] bg-white text-xs text-[#24211D] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  {design.cat !== 'grad' && (
                    <div>
                      <label className="block text-[10px] text-[#716B62] mb-1">اسم العروس (اختياري)</label>
                      <input
                        type="text"
                        value={customBride}
                        onChange={(e) => setCustomBride(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E6E1D8] bg-white text-xs text-[#24211D] focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] text-[#716B62] mb-1">اسم القاعة أو المكان</label>
                    <input
                      type="text"
                      value={customHall}
                      onChange={(e) => setCustomHall(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E6E1D8] bg-white text-xs text-[#24211D] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Feature Checklist */}
            <div className="space-y-1.5 text-xs text-[#716B62] pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>موسيقى هادئة وتأثير فتح الظرف</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>عدّاد تنازلي وموقع Google Maps</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>تأكيد حضور تفاعلي وحائط مباركات</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 mt-4 border-t border-[#E6E1D8]">
            <button
              onClick={() => onOrder(design, { groom: customGroom, bride: customBride })}
              className="w-full py-2.5 px-4 rounded-xl bg-[#29251F] text-white font-medium text-xs hover:bg-[#1A1814] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#B08D57]" />
              <span>طلب هذا التصميم وتخصيصه</span>
            </button>

            <a
              href={whatsappDirectOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl border border-[#E6E1D8] text-[#24211D] hover:bg-[#F8F6F1] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>طلب مباشر عبر واتساب</span>
              <ExternalLink className="w-3 h-3 text-[#716B62]" />
            </a>
          </div>
        </div>

        {/* Right / Center Smartphone Viewport Simulation */}
        <div className="flex-1 bg-[#141414] p-3 sm:p-6 flex items-center justify-center relative overflow-hidden">
          {/* Smartphone device chassis */}
          <div className="w-full max-w-[360px] h-[95%] max-h-[640px] bg-[#1F1F1F] rounded-[40px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-[4px] border-[#333333] flex flex-col relative overflow-hidden">
            {/* Phone Speaker & Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
              <div className="w-10 h-1 bg-[#333] rounded-full" />
            </div>

            {/* Interactive Screen Container */}
            <div className="w-full flex-1 rounded-[28px] overflow-y-auto bg-black relative shadow-inner">
              <TemplateComponent
                invitation={previewInvitation}
                guestName="سعادة الأستاذ أحمد وعائلته"
                isEnvelopeOpen={isOpened}
                onOpenEnvelope={handleOpenEnvelope}
                isPlayingMusic={isPlayingMusic}
                onToggleMusic={handleToggleMusic}
                rsvpSubmitted={rsvpSubmitted}
                onRsvpSubmit={handleRsvpSubmit}
                wishes={wishes}
                onAddWish={handleAddWish}
              />
            </div>

            {/* Bottom Home Bar Indicator */}
            <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

      </div>
    </div>
  );
};
