import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Check,
  Send,
  Heart,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { TemplateInvitationProps } from './types';

export const TemplateWedding01: React.FC<TemplateInvitationProps> = ({
  invitation,
  guestName,
  isEnvelopeOpen,
  onOpenEnvelope,
  isPlayingMusic,
  onToggleMusic,
  rsvpSubmitted,
  onRsvpSubmit,
  wishes,
  onAddWish,
  onBackToMain,
  isStandalone = false
}) => {
  const [rsvpName, setRsvpName] = useState(guestName || '');
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState('');

  const [wishName, setWishName] = useState(guestName || '');
  const [wishText, setWishText] = useState('');

  const coupleTitle = invitation.bride 
    ? `${invitation.groom} & ${invitation.bride}` 
    : invitation.groom;

  return (
    <div className="w-full min-h-full bg-[#20050B] text-[#F5E6DA] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Background Velvet Atmosphere & Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, #6E0F1B 0%, #20050B 75%)'
        }}
      />

      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#20050B]/90 backdrop-blur-md border-b border-[#C9A45C]/20">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#C9A45C] hover:text-white px-2 py-1 rounded bg-[#2A050B] border border-[#C9A45C]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#C9A45C] tracking-wider uppercase">
            Velvet Burgundy · الخميس الفاخر
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#C9A45C] text-[#20050B] border-[#C9A45C]' 
              : 'bg-[#2A050B] text-[#C9A45C] border-[#C9A45C]/40'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED VELVET ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#2A050B] border border-[#C9A45C]/40 text-xs text-[#C9A45C]">
                دعوة خاصة ومخصصة للأفاضل: <strong className="text-white">{guestName}</strong>
              </div>
            )}

            {/* Velvet Sealed Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-gradient-to-b from-[#380710] to-[#20050B] rounded-2xl p-6 border-2 border-[#C9A45C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:border-[#C9A45C] hover:scale-[1.02]"
            >
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A45C]/60 pointer-events-none" />
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A45C]/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A45C]/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A45C]/60 pointer-events-none" />

              <div className="text-center pt-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A45C] block mb-2 font-serif">
                  ROYAL WEDDING
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#F5E6DA] leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Antique Gold Wax Seal Stamp */}
              <div className="my-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#997328] via-[#D4AF37] to-[#8C6318] p-1 shadow-[0_8px_24px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-[#20050B]/40 flex flex-col items-center justify-center text-[#20050B]">
                    <Sparkles className="w-4 h-4 text-[#20050B] mb-0.5" />
                    <span className="text-[9px] font-extrabold tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#C9A45C] mt-3 font-medium">
                  انقر على الختم الملكي لفتح الدعوة
                </span>
              </div>

              <div className="text-[11px] text-[#C9A45C]/80 font-light pb-2">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#F5E6DA]/70 mt-6 max-w-xs font-serif leading-relaxed">
              «بقلوبٍ تفيضُ حباً وسروراً، نتشرفُ بدعوتكم لمشاركتنا ليلة العمر»
            </p>
          </div>
        ) : (
          /* ================= OPENED INVITATION DETAILS ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            {/* Main Velvet Parchment Card */}
            <div className="bg-gradient-to-b from-[#2E070F] to-[#1C0409] rounded-2xl p-5 sm:p-7 border border-[#C9A45C]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-center relative overflow-hidden">
              {/* Re-seal envelope button */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#C9A45C] hover:text-white bg-[#20050B]/60 px-2.5 py-1 rounded border border-[#C9A45C]/20 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {/* Guest Personalization */}
              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-xs font-semibold text-[#D4AF37]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              {/* Quranic Verse */}
              <div className="my-2 space-y-1.5">
                <p className="font-serif text-sm text-[#C9A45C] font-bold tracking-wider">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-[#F5E6DA]/90 italic leading-relaxed px-2">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto my-4" />

              {/* Hosts note */}
              {invitation.hostsNote && (
                <p className="text-xs text-[#C9A45C] mb-2 leading-relaxed font-light">
                  {invitation.hostsNote}
                </p>
              )}

              {/* Event Title */}
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              {/* Couple / Host Names */}
              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#FFFFFF] my-2 text-shadow-sm leading-tight">
                {coupleTitle}
              </h1>

              {/* Welcoming invitation note */}
              {invitation.invitationNote && (
                <p className="text-xs text-[#F5E6DA]/80 leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown Timer */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3 rounded-xl bg-[#20050B]/80 border border-[#C9A45C]/30">
                  <span className="text-[10px] text-[#C9A45C] block mb-2 font-medium">
                    الوقت المتبقي على الليلة المنتظرة
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-[#380710] rounded-lg py-2 border border-[#C9A45C]/20">
                      <span className="block font-serif text-lg font-bold text-[#D4AF37]">42</span>
                      <span className="text-[9px] text-[#F5E6DA]/60">يوم</span>
                    </div>
                    <div className="bg-[#380710] rounded-lg py-2 border border-[#C9A45C]/20">
                      <span className="block font-serif text-lg font-bold text-[#D4AF37]">08</span>
                      <span className="text-[9px] text-[#F5E6DA]/60">ساعة</span>
                    </div>
                    <div className="bg-[#380710] rounded-lg py-2 border border-[#C9A45C]/20">
                      <span className="block font-serif text-lg font-bold text-[#D4AF37]">35</span>
                      <span className="text-[9px] text-[#F5E6DA]/60">دقيقة</span>
                    </div>
                    <div className="bg-[#380710] rounded-lg py-2 border border-[#C9A45C]/20">
                      <span className="block font-serif text-lg font-bold text-[#D4AF37]">19</span>
                      <span className="text-[9px] text-[#F5E6DA]/60">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Hall Information Card */}
              <div className="p-3.5 rounded-xl bg-[#20050B]/60 border border-[#C9A45C]/30 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#380710] border border-[#C9A45C]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#C9A45C]">تاريخ الحفل</span>
                    <span className="font-semibold text-white text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#F5E6DA]/60">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#380710] border border-[#C9A45C]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#C9A45C]">التوقيت</span>
                    <span className="font-semibold text-white text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#C9A45C]/20">
                  <div className="w-8 h-8 rounded-lg bg-[#380710] border border-[#C9A45C]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#C9A45C]">مكان الحفل</span>
                    <span className="font-semibold text-white text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {/* Location Google Maps Button */}
              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#997328] via-[#D4AF37] to-[#997328] text-[#20050B] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#C9A45C]/20 text-right">
                  <span className="text-[11px] text-[#C9A45C] font-semibold block mb-2">برنامج وفقرات الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#20050B]/50 border border-[#C9A45C]/15 text-xs">
                        <span className="text-white font-medium">{p.title}</span>
                        <span className="text-[#C9A45C] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP Section */}
            {invitation.hasRsvp && (
              <div className="bg-[#2E070F] rounded-2xl p-5 border border-[#C9A45C]/30 text-right">
                <h3 className="text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#F5E6DA]/70 mb-4 leading-relaxed">
                  لحسن ترتيب المقاعد والاستقبال، نرجو التكرم بتأكيد حضوركم الكريم.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#20050B] border border-[#C9A45C]/40 text-center space-y-1">
                    <p className="text-xs font-bold text-[#D4AF37]">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-[#F5E6DA]/70">نتشرف بكم وبحضوركم تكتمل بهجتنا.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!rsvpName.trim()) return;
                      onRsvpSubmit(rsvpName.trim(), attending, count, note.trim());
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-[11px] text-[#C9A45C] block mb-1">اسم الضيف أو العائلة</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اكتب اسمكم الكريم هنا"
                        required
                        className="w-full bg-[#20050B] border border-[#C9A45C]/30 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#D4AF37] text-[#20050B] border-[#D4AF37]' 
                            : 'bg-[#20050B] text-white/70 border-[#C9A45C]/30'
                        }`}
                      >
                        سأحضر بكل سرور
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#6E0F1B] text-white border-[#C9A45C]' 
                            : 'bg-[#20050B] text-white/70 border-[#C9A45C]/30'
                        }`}
                      >
                        أعتذر لظرف خاص
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#C9A45C] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#20050B] border border-[#C9A45C]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value={1}>شخص واحد (١)</option>
                          <option value={2}>شخصان (٢)</option>
                          <option value={3}>٣ أشخاص</option>
                          <option value={4}>٤ أشخاص</option>
                          <option value={5}>٥ أشخاص فأكثر</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#20050B] font-bold text-xs hover:brightness-105 active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#2E070F] rounded-2xl p-5 border border-[#C9A45C]/30 text-right">
                <h3 className="text-sm font-bold text-[#D4AF37] mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <span>حائط التهاني والمباركات</span>
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!wishName.trim() || !wishText.trim()) return;
                    onAddWish(wishName.trim(), wishText.trim());
                    setWishText('');
                  }}
                  className="space-y-2 mb-4"
                >
                  <input
                    type="text"
                    value={wishName}
                    onChange={(e) => setWishName(e.target.value)}
                    placeholder="الاسم"
                    required
                    className="w-full bg-[#20050B] border border-[#C9A45C]/30 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب أرق التهاني للعروسين..."
                    rows={2}
                    required
                    className="w-full bg-[#20050B] border border-[#C9A45C]/30 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#380710] border border-[#C9A45C]/50 text-xs font-semibold text-[#D4AF37] hover:bg-[#4A0A16] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-[#20050B] border border-[#C9A45C]/15 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#C9A45C] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-white/40">{w.time}</span>
                      </div>
                      <p className="text-[#F5E6DA]/90 leading-relaxed text-[11px]">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
