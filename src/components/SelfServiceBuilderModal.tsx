import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Palette, 
  MapPin, 
  Music, 
  Sliders, 
  Heart, 
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  DesignItem, 
  CreatedInvitation, 
  ProgramItem, 
  saveCreatedInvitation 
} from '../data/wedlinkData';

interface SelfServiceBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  designs: DesignItem[];
  selectedDesignInitial?: DesignItem | null;
  onInvitationGenerated: (invitation: CreatedInvitation) => void;
  defaultHostWhatsapp?: string;
}

export const SelfServiceBuilderModal: React.FC<SelfServiceBuilderModalProps> = ({
  isOpen,
  onClose,
  designs,
  selectedDesignInitial,
  onInvitationGenerated,
  defaultHostWhatsapp = '',
}) => {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const [selectedDesignSlug, setSelectedDesignSlug] = useState<string>(
    selectedDesignInitial?.slug || (designs[0]?.slug ?? 'anasandrama')
  );
  const [eventType, setEventType] = useState<'wedding' | 'henna' | 'grad' | 'engagement' | 'party'>('wedding');
  const [eventTitle, setEventTitle] = useState('حفل زفاف مبارك');
  const [groom, setGroom] = useState('عمر حسان');
  const [bride, setBride] = useState('سارة النجار');
  const [hostsNote, setHostsNote] = useState('بدعوة كريمة من والد العريس ووالد العروس');
  const [quranVerse, setQuranVerse] = useState('وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً');
  const [invitationNote, setInvitationNote] = useState('يسعدنا ويشرفنا دعوتكم لمشاركتنا فرحتنا ولقاء الأحبة، وبحضوركم تكتمل بهجة ليلتنا');
  
  // Date & Venue
  const [dateText, setDateText] = useState('الجمعة، ٢٤ أكتوبر ٢٠٢٦');
  const [hijriDate, setHijriDate] = useState('١٣ ربيع الثاني ١٤٤٨ هـ');
  const [timeText, setTimeText] = useState('الساعة ٧:٣٠ مساءً');
  const [eventDateIso, setEventDateIso] = useState('2026-10-24T19:30:00');
  const [hall, setHall] = useState('فندق الرويال · قاعة الملوك');
  const [city, setCity] = useState('عمّان، الأردن');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('https://maps.google.com/?q=Le+Royal+Hotel+Amman');

  // Timeline / Program
  const [program, setProgram] = useState<ProgramItem[]>([
    { id: '1', time: '٧:٣٠ م', title: 'استقبال الضيوف الكرام' },
    { id: '2', time: '٨:٣٠ م', title: 'زفة العروسين ودخول القاعة' },
    { id: '3', time: '٩:٣٠ م', title: 'بوفيه العشاء الفاخر' },
    { id: '4', time: '١٠:٣٠ م', title: 'تقطيع قالب الحلوى والمباركات' }
  ]);
  const [newProgramTime, setNewProgramTime] = useState('');
  const [newProgramTitle, setNewProgramTitle] = useState('');

  // Interactive Features
  const [hasMusic, setHasMusic] = useState(true);
  const [hasCountdown, setHasCountdown] = useState(true);
  const [hasRsvp, setHasRsvp] = useState(true);
  const [hostWhatsapp, setHostWhatsapp] = useState(defaultHostWhatsapp);
  const [hasWishesWall, setHasWishesWall] = useState(true);

  if (!isOpen) return null;

  const currentDesign = designs.find(d => d.slug === selectedDesignSlug) || designs[0];

  // Quick Preset / Sample loader
  const handleFillSample = (type: 'wedding' | 'henna' | 'grad') => {
    if (type === 'wedding') {
      setEventType('wedding');
      setEventTitle('حفل زفاف مبارك');
      setGroom('عبدالله القيسي');
      setBride('ريم الشريف');
      setHostsNote('يتشرف السيد أحمد القيسي والسيد محمد الشريف بدعوتكم لحضور زفاف نجليهما');
      setQuranVerse('وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً');
      setInvitationNote('بحضوركم تزهو ليالينا وتكتمل فرحتنا، ويسعدنا مشاركتكم لنا هذا اليوم البهيج');
      setHall('فندق الفورسيزونز · قاعة الأميرات');
      setCity('عمّان، الدوار الخامس');
      setDateText('الخميس، ١٥ نوفمبر ٢٠٢٦');
      setHijriDate('٥ جمادى الأولى ١٤٤٨ هـ');
      setTimeText('الساعة ٨:٠٠ مساءً');
      setEventDateIso('2026-11-15T20:00:00');
      setSelectedDesignSlug('anasandrama');
    } else if (type === 'henna') {
      setEventType('henna');
      setEventTitle('سهرة ليلة الحنّاء الفاخرة');
      setGroom('ريم الشريف');
      setBride('');
      setHostsNote('دعوة نسائية خاصة برائحة المسك والورد الجوري');
      setQuranVerse('يا طير طاير بالأفراح غنّي.. ليلة حنّاك يا بدر التمام');
      setInvitationNote('يسعدنا دعوتكم لأجمل سهرة حناء فلسطينية وأردنية مع الزغاريد والتراث الأصيل');
      setHall('قصر الصنوبر للأفراح والمناسبات');
      setCity('عمّان');
      setDateText('الأربعاء، ١٤ نوفمبر ٢٠٢٦');
      setHijriDate('٤ جمادى الأولى ١٤٤٨ هـ');
      setTimeText('الساعة ٦:٣٠ مساءً');
      setEventDateIso('2026-11-14T18:30:00');
      setSelectedDesignSlug('zaffat-henna');
    } else {
      setEventType('grad');
      setEventTitle('حفل تخرّج مبارك');
      setGroom('المهندس طارق الزعبي');
      setBride('');
      setHostsNote('فرحة التخرج وجني ثمار السنين');
      setQuranVerse('وَقُل رَّبِّ زِدْنِي عِلْمًا');
      setInvitationNote('يسعدنا تشريفكم لمشاركتنا فرحة تخرج نجلنا بتفوق واقتدار من كلية الهندسة');
      setHall('نادي الملك الحسين · التراس الصيفي');
      setCity('عمّان');
      setDateText('السبت، ٢٠ أغسطس ٢٠٢٦');
      setHijriDate('٢٥ صفر ١٤٤٨ هـ');
      setTimeText('الساعة ٧:٠٠ مساءً');
      setEventDateIso('2026-08-20T19:00:00');
      setSelectedDesignSlug('mrtareq');
    }
  };

  // Add program timeline item
  const handleAddProgramItem = () => {
    if (!newProgramTime.trim() || !newProgramTitle.trim()) return;
    setProgram(prev => [
      ...prev,
      { id: String(Date.now()), time: newProgramTime.trim(), title: newProgramTitle.trim() }
    ]);
    setNewProgramTime('');
    setNewProgramTitle('');
  };

  const handleRemoveProgramItem = (id: string) => {
    setProgram(prev => prev.filter(p => p.id !== id));
  };

  // FINISH & INSTANT GENERATE
  const handleGenerateInvitation = () => {
    const invId = `INV-${Date.now().toString(36).toUpperCase()}`;
    const newInvitation: CreatedInvitation = {
      id: invId,
      createdAt: new Date().toISOString(),
      templateId: currentDesign?.templateId,
      designSlug: selectedDesignSlug,
      designName: currentDesign?.name || 'تصميم فاخر',
      eventType,
      eventTitle: eventTitle.trim() || 'دعوة حفل',
      groom: groom.trim(),
      bride: bride.trim() || undefined,
      hostsNote: hostsNote.trim() || undefined,
      quranVerse: quranVerse.trim() || undefined,
      invitationNote: invitationNote.trim(),
      dateText: dateText.trim(),
      hijriDate: hijriDate.trim() || undefined,
      timeText: timeText.trim(),
      eventDateIso,
      hall: hall.trim(),
      city: city.trim(),
      googleMapsUrl: googleMapsUrl.trim() || undefined,
      program,
      hasMusic,
      hasCountdown,
      hasRsvp,
      hostWhatsapp: hostWhatsapp.trim() || undefined,
      hasWishesWall,
      wishes: [
        { id: '1', name: 'أهل وأقارب العروسين', text: 'ألف مبارك وبالرفاه والبنين، بارك الله لكما وجمع بينكما في خير ✨', time: 'الآن' }
      ]
    };

    // Save locally
    saveCreatedInvitation(newInvitation);

    // Callback to parent to open the Result Modal immediately!
    onInvitationGenerated(newInvitation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24211D]/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="self-service-builder-modal-card"
        className="relative w-full max-w-4xl bg-white border border-[#E6E1D8] rounded-2xl shadow-xl text-[#24211D] overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-[#E6E1D8] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F1EEE7] border border-[#B08D57]/30 flex items-center justify-center text-[#B08D57] shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#24211D] flex items-center gap-2">
                <span>إنشاء وتجهيز الدعوة الإلكترونية</span>
                <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#F1EEE7] text-[#24211D] border border-[#B08D57]/30 font-medium">
                  تجهيز فوري
                </span>
              </h2>
              <p className="text-xs text-[#716B62]">
                أدخل تفاصيل مناسبتكم، وسيقوم النظام بتجهيز الرابط ورمز QR ورسالة الواتساب فوراً.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Demo Fill Buttons */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#F8F6F1] p-1 rounded-xl border border-[#E6E1D8] text-xs">
              <span className="text-[10px] text-[#716B62] px-1.5">نموذج تجريبي:</span>
              <button
                type="button"
                onClick={() => handleFillSample('wedding')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-[#24211D] text-[11px] font-medium transition-colors"
              >
                زفاف
              </button>
              <button
                type="button"
                onClick={() => handleFillSample('henna')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-[#24211D] text-[11px] font-medium transition-colors"
              >
                حناء
              </button>
              <button
                type="button"
                onClick={() => handleFillSample('grad')}
                className="px-2.5 py-1 rounded-lg hover:bg-white text-[#24211D] text-[11px] font-medium transition-colors"
              >
                تخرج
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wizard Steps Stepper */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F8F6F1] border-b border-[#E6E1D8] flex items-center justify-between gap-1 overflow-x-auto text-xs shrink-0">
          {[
            { step: 1, title: 'التصميم' },
            { step: 2, title: 'الأسماء والمناسبة' },
            { step: 3, title: 'الموعد والمكان' },
            { step: 4, title: 'برنامج الحفل' },
            { step: 5, title: 'الميزات الذكية' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step as 1 | 2 | 3 | 4 | 5)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors shrink-0 ${
                currentStep === s.step
                  ? 'bg-[#29251F] text-white font-semibold shadow-2xs border border-[#B08D57]/30'
                  : 'text-[#716B62] hover:text-[#24211D] hover:bg-[#E6E1D8]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                currentStep === s.step ? 'bg-[#B08D57] text-white' : 'bg-[#E6E1D8] text-[#716B62]'
              }`}>
                {s.step}
              </span>
              <span className="whitespace-nowrap text-[11px]">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Body / Steps */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: SELECT DESIGN */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#24211D] flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#B08D57]" />
                    <span>اختر طراز وتصميم الدعوة:</span>
                  </h3>
                  <p className="text-xs text-[#716B62]">
                    اختر النمط المناسب لذوق حفلكم
                  </p>
                </div>
                <span className="text-xs text-[#B08D57] font-semibold">
                  المختار: {currentDesign.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {designs.map((design) => {
                  const isSelected = selectedDesignSlug === design.slug;
                  return (
                    <div
                      key={design.slug}
                      onClick={() => setSelectedDesignSlug(design.slug)}
                      className={`group cursor-pointer rounded-2xl p-2.5 border transition-all relative overflow-hidden text-right ${
                        isSelected 
                          ? 'border-2 border-[#B08D57] bg-[#F1EEE7] shadow-sm' 
                          : 'border-[#E6E1D8] bg-[#F8F6F1] hover:border-[#B08D57]'
                      }`}
                    >
                      {/* Check badge */}
                      {isSelected && (
                        <div className="absolute top-2.5 left-2.5 z-10 w-5 h-5 rounded-full bg-[#B08D57] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3" />
                        </div>
                      )}

                      <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-[#E6E1D8] relative">
                        <img
                          src={design.thumb}
                          alt={design.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <p className="font-semibold text-xs text-[#24211D] truncate">{design.name}</p>
                      <p className="text-[10px] text-[#716B62] truncate font-serif">{design.latin}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: NAMES & EVENT TYPE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#24211D]">
                  تفاصيل المناسبة وأسماء أصحاب الحفل:
                </h3>
                <p className="text-xs text-[#716B62]">
                  تظهر هذه الأسماء بخطوط واضحة وأنيقة في واجهة الدعوة
                </p>
              </div>

              {/* Event Type pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'wedding', label: 'حفل زفاف' },
                  { key: 'henna', label: 'ليلة حناء' },
                  { key: 'grad', label: 'حفل تخرج' },
                  { key: 'engagement', label: 'عقد قران / خطوبة' },
                  { key: 'party', label: 'مناسبة خاصة' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setEventType(item.key as typeof eventType);
                      if (item.key === 'wedding') setEventTitle('حفل زفاف مبارك');
                      if (item.key === 'henna') setEventTitle('ليلة الحناء المباركة');
                      if (item.key === 'grad') setEventTitle('حفل تخرّج مبارك');
                      if (item.key === 'engagement') setEventTitle('حفل عقد قران مبارك');
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                      eventType === item.key
                        ? 'bg-[#29251F] text-white border-[#B08D57]'
                        : 'bg-[#F8F6F1] border-[#E6E1D8] text-[#716B62] hover:text-[#24211D]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    {eventType === 'grad' ? 'اسم الخريج / المحتفى به:' : 'اسم العريس:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={groom}
                    onChange={(e) => setGroom(e.target.value)}
                    placeholder="مثال: عمر حسان"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>

                {eventType !== 'grad' && (
                  <div>
                    <label className="block text-xs text-[#716B62] mb-1">
                      {eventType === 'henna' ? 'اسم العروس:' : 'اسم العروس (اختياري):'}
                    </label>
                    <input
                      type="text"
                      value={bride}
                      onChange={(e) => setBride(e.target.value)}
                      placeholder="مثال: سارة النجار"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-[#716B62] mb-1">
                  عنوان الحفل الرئيسي:
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="مثال: حفل زفاف مبارك"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#716B62] mb-1">
                  أسماء أولياء الأمور والداعين:
                </label>
                <input
                  type="text"
                  value={hostsNote}
                  onChange={(e) => setHostsNote(e.target.value)}
                  placeholder="مثال: بدعوة كريمة من والد العريس ووالد العروس"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#716B62]">
                    الآية القرآنية أو النص الافتتاحي:
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setQuranVerse('وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً')}
                      className="text-[10px] text-[#B08D57] hover:underline font-medium"
                    >
                      آية الروم
                    </button>
                    <span className="text-[#E6E1D8]">·</span>
                    <button
                      type="button"
                      onClick={() => setQuranVerse('بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ')}
                      className="text-[10px] text-[#B08D57] hover:underline font-medium"
                    >
                      دعاء مبارك
                    </button>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={quranVerse}
                  onChange={(e) => setQuranVerse(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#716B62] mb-1">
                  نص الترحيب بالمدعوين:
                </label>
                <textarea
                  rows={2}
                  value={invitationNote}
                  onChange={(e) => setInvitationNote(e.target.value)}
                  placeholder="نص ترحيبي يظهر داخل البطاقة"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: DATE & LOCATION */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#24211D] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B08D57]" />
                  <span>الموعد، التوقيت، ومكان الحفل:</span>
                </h3>
                <p className="text-xs text-[#716B62]">
                  تظهر هذه المعلومات مع زر اتجاهات Google Maps التفاعلي
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    تاريخ الحفل الميلادي:
                  </label>
                  <input
                    type="text"
                    required
                    value={dateText}
                    onChange={(e) => setDateText(e.target.value)}
                    placeholder="مثال: الجمعة، ٢٤ أكتوبر ٢٠٢٦"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    التاريخ الهجري (اختياري):
                  </label>
                  <input
                    type="text"
                    value={hijriDate}
                    onChange={(e) => setHijriDate(e.target.value)}
                    placeholder="مثال: ١٣ ربيع الثاني ١٤٤٨ هـ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    موعد الحفل / وقت البدء:
                  </label>
                  <input
                    type="text"
                    required
                    value={timeText}
                    onChange={(e) => setTimeText(e.target.value)}
                    placeholder="مثال: الساعة ٧:٣٠ مساءً"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    تاريخ العداد التنازلي التلقائي:
                  </label>
                  <input
                    type="datetime-local"
                    value={eventDateIso}
                    onChange={(e) => setEventDateIso(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    اسم القاعة أو الفندق:
                  </label>
                  <input
                    type="text"
                    required
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    placeholder="مثال: فندق الرويال · قاعة الملوك"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#716B62] mb-1">
                    المدينة والدولة:
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: عمّان، الأردن"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#716B62] mb-1">
                  رابط موقع القاعة على خرائط Google Maps:
                </label>
                <input
                  type="url"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] focus:border-[#B08D57] focus:bg-white outline-none font-mono"
                />
                <p className="text-[10px] text-[#716B62] mt-1">
                  إذا تُرك فارغاً، سيتم البحث تلقائياً باسم القاعة والمدينة عند ضغط الضيف على زر الخريطة.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: TIMELINE / PROGRAM */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#24211D] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B08D57]" />
                  <span>برنامج وفقرات الحفل (Timeline):</span>
                </h3>
                <p className="text-xs text-[#716B62]">
                  يمكنك إضافة وتعديل توقيت كل فقرة في الحفل لتنظيم وقت الضيوف
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {program.map((item, idx) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-[#E6E1D8] text-[#24211D] flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[#24211D] truncate">{item.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[#B08D57] bg-white px-2.5 py-1 rounded-lg border border-[#E6E1D8] text-[11px] font-semibold">
                        {item.time}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProgramItem(item.id)}
                        className="p-1 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Program Item */}
              <div className="p-3.5 rounded-2xl bg-[#F1EEE7] border border-[#E6E1D8] space-y-2">
                <span className="text-xs font-semibold text-[#24211D]">إضافة فقرة جديدة:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="عنوان الفقرة (مثال: الزفة المباركة)"
                    value={newProgramTitle}
                    onChange={(e) => setNewProgramTitle(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E6E1D8] text-xs text-[#24211D] outline-none focus:border-[#B08D57]"
                  />
                  <input
                    type="text"
                    placeholder="التوقيت (مثال: ٨:١٥ م)"
                    value={newProgramTime}
                    onChange={(e) => setNewProgramTime(e.target.value)}
                    className="w-full sm:w-32 px-3 py-2 rounded-xl bg-white border border-[#E6E1D8] text-xs text-[#24211D] outline-none focus:border-[#B08D57]"
                  />
                  <button
                    type="button"
                    onClick={handleAddProgramItem}
                    className="px-4 py-2 rounded-xl bg-[#29251F] hover:bg-[#1A1814] text-white font-semibold text-xs transition-colors whitespace-nowrap border border-[#B08D57]/30"
                  >
                    + إضافة
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SMART FEATURES */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#24211D] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#B08D57]" />
                  <span>الميزات التفاعلية وتأكيد الحضور (RSVP):</span>
                </h3>
                <p className="text-xs text-[#716B62]">
                  حدد الميزات التفاعلية التي تود تفعيلها لضيوفك
                </p>
              </div>

              <div className="space-y-3">
                {/* RSVP WhatsApp Option */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-[#24211D] block">
                        تأكيد الحضور (RSVP) مباشرة على واتساب المضيف:
                      </span>
                      <span className="text-[11px] text-[#716B62]">
                        عندما يؤكد أي ضيف حضوره، يصله خيار إرسال التأكيد مباشرة إلى رقم هاتفك
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasRsvp}
                      onChange={(e) => setHasRsvp(e.target.checked)}
                      className="w-4 h-4 accent-[#B08D57] cursor-pointer"
                    />
                  </div>

                  {hasRsvp && (
                    <div className="pt-2 border-t border-[#E6E1D8]">
                      <label className="block text-xs text-[#716B62] mb-1">
                        رقم واتسابك لاستلام ردود الحضور (مثال: 962791234567):
                      </label>
                      <input
                        type="tel"
                        value={hostWhatsapp}
                        onChange={(e) => setHostWhatsapp(e.target.value)}
                        placeholder="962775179231"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6E1D8] text-xs text-[#24211D] font-mono outline-none focus:border-[#B08D57]"
                      />
                    </div>
                  )}
                </div>

                {/* Music Toggle */}
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Music className="w-4 h-4 text-[#B08D57]" />
                    <div>
                      <span className="font-semibold text-xs text-[#24211D] block">الموسيقى الخلفية الهادئة</span>
                      <span className="text-[10px] text-[#716B62]">نغمات موسيقية هادئة تبدأ فور فتح الضيف للظرف</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasMusic}
                    onChange={(e) => setHasMusic(e.target.checked)}
                    className="w-4 h-4 accent-[#B08D57] cursor-pointer"
                  />
                </div>

                {/* Countdown Toggle */}
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#B08D57]" />
                    <div>
                      <span className="font-semibold text-xs text-[#24211D] block">العدّاد التنازلي التفاعلي</span>
                      <span className="text-[10px] text-[#716B62]">يحسب الأيام والساعات حتى موعد الحفل</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasCountdown}
                    onChange={(e) => setHasCountdown(e.target.checked)}
                    className="w-4 h-4 accent-[#B08D57] cursor-pointer"
                  />
                </div>

                {/* Wishes Wall Toggle */}
                <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-[#B08D57]" />
                    <div>
                      <span className="font-semibold text-xs text-[#24211D] block">حائط المباركات والتهاني</span>
                      <span className="text-[10px] text-[#716B62]">يمكن للمدعوين ترك عبارات تهنئة تظهر بالدعوة</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasWishesWall}
                    onChange={(e) => setHasWishesWall(e.target.checked)}
                    className="w-4 h-4 accent-[#B08D57] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#E6E1D8] bg-[#F8F6F1] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5)}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#24211D] bg-white border border-[#E6E1D8] hover:bg-[#F1EEE7] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>السابق</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#716B62] hover:text-[#24211D] transition-colors"
              >
                إلغاء
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5)}
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] transition-colors border border-[#B08D57]/30 shadow-xs"
              >
                <span>متابعة الخطوة التالية</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            ) : (
              /* THE FINISH BUTTON */
              <button
                id="generate-instant-invitation-btn"
                type="button"
                onClick={handleGenerateInvitation}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all border border-[#B08D57]/40 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D6BE91]" />
                <span>إنهاء وتوليد الرابط الجاهز فوراً</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
