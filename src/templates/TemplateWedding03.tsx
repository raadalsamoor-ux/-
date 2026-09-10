import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
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

export const TemplateWedding03: React.FC<TemplateInvitationProps> = ({
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
    <div className="w-full min-h-full bg-[#0A1128] text-[#F8FAFC] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#0A1128]/90 backdrop-blur-md border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:text-white px-2 py-1 rounded bg-[#1C2541] border border-[#D4AF37]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#D4AF37] tracking-wider uppercase">
            Royal Navy & Gold · الكحلي والذهب
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#D4AF37] text-[#0A1128] border-[#D4AF37]' 
              : 'bg-[#1C2541] text-[#D4AF37] border-[#D4AF37]/40'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED NAVY ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#1C2541] border border-[#D4AF37]/40 text-xs text-[#D4AF37]">
                دعوة خاصة إلى: <strong className="text-white">{guestName}</strong>
              </div>
            )}

            {/* Navy Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-gradient-to-b from-[#1C2541] to-[#0A1128] rounded-2xl p-6 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Gold Geometric Arabesque border */}
              <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-xl pointer-events-none" />

              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-2 font-serif">
                  ROYAL WEDDING CELEBRATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Gold Midnight Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B38F24] via-[#F3E5AB] to-[#D4AF37] p-1 shadow-[0_8px_25px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center text-[#0A1128]">
                  <div className="w-full h-full rounded-full border border-[#0A1128]/30 flex flex-col items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0A1128] mb-0.5" />
                    <span className="text-[9px] font-black tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] mt-3 font-medium">
                  انقر لفتح الدعوة الملكية
                </span>
              </div>

              <div className="text-[11px] text-[#D4AF37]/80 font-light pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#F8FAFC]/70 mt-6 max-w-xs leading-relaxed font-serif">
              «بحضوركم تزهو ليالينا ويكتمل بهاء فرحتنا المباركة»
            </p>
          </div>
        ) : (
          /* ================= OPENED ROYAL NAVY CARD ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            {/* Main Navy Card */}
            <div className="bg-gradient-to-b from-[#16203B] to-[#0D152F] rounded-2xl p-5 sm:p-7 border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#D4AF37] hover:text-white bg-[#0A1128]/70 px-2.5 py-1 rounded border border-[#D4AF37]/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#1C2541] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              {/* Quranic Verse */}
              <div className="my-2 space-y-1">
                <p className="font-serif text-sm text-[#D4AF37] font-bold tracking-widest">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-[#F8FAFC]/80 italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-24 h-[1px] bg-[#D4AF37]/40 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-[#D4AF37] mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white my-2 leading-tight">
                {coupleTitle}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-[#F8FAFC]/80 leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown Timer */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-xl bg-[#0A1128]/80 border border-[#D4AF37]/40">
                  <span className="text-[10px] text-[#D4AF37] block mb-2 font-medium">
                    المتبقي على موعد الحفل
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#1C2541] rounded-lg py-2 border border-[#D4AF37]/20">
                      <span className="block text-lg font-bold text-[#D4AF37]">42</span>
                      <span className="text-[9px] text-[#F8FAFC]/60">يوم</span>
                    </div>
                    <div className="bg-[#1C2541] rounded-lg py-2 border border-[#D4AF37]/20">
                      <span className="block text-lg font-bold text-[#D4AF37]">08</span>
                      <span className="text-[9px] text-[#F8FAFC]/60">ساعة</span>
                    </div>
                    <div className="bg-[#1C2541] rounded-lg py-2 border border-[#D4AF37]/20">
                      <span className="block text-lg font-bold text-[#D4AF37]">35</span>
                      <span className="text-[9px] text-[#F8FAFC]/60">دقيقة</span>
                    </div>
                    <div className="bg-[#1C2541] rounded-lg py-2 border border-[#D4AF37]/20">
                      <span className="block text-lg font-bold text-[#D4AF37]">19</span>
                      <span className="text-[9px] text-[#F8FAFC]/60">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Hall Card */}
              <div className="p-3.5 rounded-xl bg-[#0A1128]/60 border border-[#D4AF37]/30 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C2541] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#D4AF37]">تاريخ الحفل</span>
                    <span className="font-semibold text-white text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#F8FAFC]/60">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C2541] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#D4AF37]">الوقت</span>
                    <span className="font-semibold text-white text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#D4AF37]/20">
                  <div className="w-8 h-8 rounded-lg bg-[#1C2541] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#D4AF37]">الموقع والقاعة</span>
                    <span className="font-semibold text-white text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B38F24] via-[#D4AF37] to-[#B38F24] text-[#0A1128] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 text-right">
                  <span className="text-[11px] text-[#D4AF37] font-semibold block mb-2">برنامج الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#0A1128]/70 border border-[#D4AF37]/20 text-xs">
                        <span className="text-white font-medium">{p.title}</span>
                        <span className="text-[#D4AF37] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP Section */}
            {invitation.hasRsvp && (
              <div className="bg-[#16203B] rounded-2xl p-5 border border-[#D4AF37]/40 text-right shadow-lg">
                <h3 className="text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#F8FAFC]/70 mb-4">
                  نرجو التكرم بتأكيد حضوركم لحجز المقاعد.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#0A1128] border border-[#D4AF37]/40 text-center space-y-1">
                    <p className="text-xs font-bold text-[#D4AF37]">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-[#F8FAFC]/70">نتطلع بشوق لرؤيتكم معنا في هذا اليوم الجميل.</p>
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
                      <label className="text-[11px] text-[#D4AF37] block mb-1">اسم الضيف</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#D4AF37] text-[#0A1128] border-[#D4AF37]' 
                            : 'bg-[#0A1128] text-white/70 border-[#D4AF37]/30'
                        }`}
                      >
                        سأحضر بكل سرور
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#1C2541] text-[#D4AF37] border-[#D4AF37]' 
                            : 'bg-[#0A1128] text-white/70 border-[#D4AF37]/30'
                        }`}
                      >
                        أعتذر عن الحضور
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#D4AF37] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-xs hover:brightness-105 active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#16203B] rounded-2xl p-5 border border-[#D4AF37]/40 text-right shadow-lg">
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
                    className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب أرق التهاني والتبريكات..."
                    rows={2}
                    required
                    className="w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#0A1128] border border-[#D4AF37]/50 text-xs font-semibold text-[#D4AF37] hover:bg-[#121B38] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-[#0A1128] border border-[#D4AF37]/20 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#D4AF37] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-white/40">{w.time}</span>
                      </div>
                      <p className="text-[#F8FAFC]/90 leading-relaxed text-[11px]">{w.text}</p>
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
