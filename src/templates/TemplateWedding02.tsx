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

export const TemplateWedding02: React.FC<TemplateInvitationProps> = ({
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
    <div className="w-full min-h-full bg-[#FCF8ED] text-[#2E2D24] font-serif antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#FCF8ED]/90 backdrop-blur-md border-b border-[#B6933E]/30">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#7E8B6C] hover:text-[#2E2D24] px-2 py-1 rounded bg-[#FFFFFF] border border-[#B6933E]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#7E8B6C] tracking-wider uppercase">
            Ivory Classic · العاجي الكلاسيكي
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#7E8B6C] text-white border-[#7E8B6C]' 
              : 'bg-white text-[#7E8B6C] border-[#7E8B6C]/40'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED IVORY ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-white border border-[#B6933E]/40 text-xs text-[#7E8B6C]">
                دعوة خاصة إلى: <strong className="text-[#2E2D24]">{guestName}</strong>
              </div>
            )}

            {/* Ivory Classic Sealed Card */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-[#FFFFFF] rounded-2xl p-6 border-2 border-[#B6933E]/50 shadow-[0_16px_36px_rgba(182,147,62,0.15)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:border-[#B6933E] hover:scale-[1.02]"
            >
              {/* Classical Inner Double Border */}
              <div className="absolute inset-3 border border-[#B6933E]/30 rounded-xl pointer-events-none" />

              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7E8B6C] block mb-2">
                  WEDDING INVITATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#2E2D24] leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Olive Wax Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#69745A] to-[#8C9B7A] p-1 shadow-[0_6px_20px_rgba(126,139,108,0.35)] group-hover:scale-105 transition-transform flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-full border border-white/40 flex flex-col items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white mb-0.5" />
                    <span className="text-[9px] font-bold tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#7E8B6C] mt-3 font-medium">
                  اضغط لفتح بطاقة الدعوة
                </span>
              </div>

              <div className="text-[11px] text-[#7E8B6C] font-light pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#7E8B6C] mt-6 max-w-xs leading-relaxed">
              «بكل مشاعر الود والتقدير نتشرف بحضوركم لمشاركتنا فرحتنا»
            </p>
          </div>
        ) : (
          /* ================= OPENED CLASSIC INVITATION ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            {/* Main Classic Card */}
            <div className="bg-[#FFFFFF] rounded-2xl p-5 sm:p-7 border-2 border-[#B6933E]/30 shadow-[0_12px_32px_rgba(46,45,36,0.06)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#7E8B6C] hover:text-[#2E2D24] bg-[#FCF8ED] px-2.5 py-1 rounded border border-[#B6933E]/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#FCF8ED] border border-[#B6933E]/30 text-xs font-semibold text-[#7E8B6C]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              {/* Quranic Verse */}
              <div className="my-2 space-y-1">
                <p className="text-sm text-[#B6933E] font-bold tracking-wider">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs text-[#7E8B6C] italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-20 h-[1px] bg-[#B6933E]/40 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-[#7E8B6C] mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#7E8B6C] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#2E2D24] my-2 leading-tight">
                {coupleTitle}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-[#55534A] leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown Timer */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-xl bg-[#FCF8ED] border border-[#B6933E]/30">
                  <span className="text-[10px] text-[#7E8B6C] block mb-2 font-medium">
                    المتبقي على موعد الحفل
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white rounded-lg py-2 border border-[#B6933E]/20">
                      <span className="block text-lg font-bold text-[#2E2D24]">42</span>
                      <span className="text-[9px] text-[#7E8B6C]">يوم</span>
                    </div>
                    <div className="bg-white rounded-lg py-2 border border-[#B6933E]/20">
                      <span className="block text-lg font-bold text-[#2E2D24]">08</span>
                      <span className="text-[9px] text-[#7E8B6C]">ساعة</span>
                    </div>
                    <div className="bg-white rounded-lg py-2 border border-[#B6933E]/20">
                      <span className="block text-lg font-bold text-[#2E2D24]">35</span>
                      <span className="text-[9px] text-[#7E8B6C]">دقيقة</span>
                    </div>
                    <div className="bg-white rounded-lg py-2 border border-[#B6933E]/20">
                      <span className="block text-lg font-bold text-[#2E2D24]">19</span>
                      <span className="text-[9px] text-[#7E8B6C]">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date & Hall Card */}
              <div className="p-3.5 rounded-xl bg-[#FCF8ED] border border-[#B6933E]/30 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#B6933E]/30 flex items-center justify-center text-[#7E8B6C] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#7E8B6C]">تاريخ الحفل</span>
                    <span className="font-semibold text-[#2E2D24] text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#7E8B6C]">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#B6933E]/30 flex items-center justify-center text-[#7E8B6C] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#7E8B6C]">الموعد</span>
                    <span className="font-semibold text-[#2E2D24] text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#B6933E]/20">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#B6933E]/30 flex items-center justify-center text-[#7E8B6C] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#7E8B6C]">القاعة</span>
                    <span className="font-semibold text-[#2E2D24] text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#7E8B6C] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#687358] active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#B6933E]/20 text-right">
                  <span className="text-[11px] text-[#7E8B6C] font-semibold block mb-2">برنامج الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#FCF8ED] border border-[#B6933E]/20 text-xs">
                        <span className="text-[#2E2D24] font-medium">{p.title}</span>
                        <span className="text-[#7E8B6C] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP Form */}
            {invitation.hasRsvp && (
              <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#B6933E]/30 text-right shadow-sm">
                <h3 className="text-sm font-bold text-[#2E2D24] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#7E8B6C]" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#7E8B6C] mb-4">
                  يسعدنا تأكيد حضوركم لترتيب المقاعد بأفضل شكل.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#FCF8ED] border border-[#B6933E]/30 text-center space-y-1">
                    <p className="text-xs font-bold text-[#7E8B6C]">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-[#55534A]">أهلاً وسهلاً بكم، ونسعد بتشريفكم لنا.</p>
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
                      <label className="text-[11px] text-[#7E8B6C] block mb-1">اسم الضيف</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-[#FCF8ED] border border-[#B6933E]/30 rounded-lg px-3 py-2 text-xs text-[#2E2D24] focus:outline-none focus:border-[#7E8B6C]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#7E8B6C] text-white border-[#7E8B6C]' 
                            : 'bg-[#FCF8ED] text-[#2E2D24] border-[#B6933E]/30'
                        }`}
                      >
                        سأحضر بإذن الله
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#B6933E] text-white border-[#B6933E]' 
                            : 'bg-[#FCF8ED] text-[#2E2D24] border-[#B6933E]/30'
                        }`}
                      >
                        أعتذر عن الحضور
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#7E8B6C] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#FCF8ED] border border-[#B6933E]/30 rounded-lg px-3 py-2 text-xs text-[#2E2D24] focus:outline-none focus:border-[#7E8B6C]"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2E2D24] text-white font-bold text-xs hover:bg-black active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#B6933E]/30 text-right shadow-sm">
                <h3 className="text-sm font-bold text-[#2E2D24] mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#B6933E]" />
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
                    className="w-full bg-[#FCF8ED] border border-[#B6933E]/30 rounded-lg px-3 py-1.5 text-xs text-[#2E2D24] focus:outline-none focus:border-[#7E8B6C]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب أصدق التهاني والتبريكات..."
                    rows={2}
                    required
                    className="w-full bg-[#FCF8ED] border border-[#B6933E]/30 rounded-lg px-3 py-1.5 text-xs text-[#2E2D24] focus:outline-none focus:border-[#7E8B6C]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#FCF8ED] border border-[#B6933E]/40 text-xs font-semibold text-[#7E8B6C] hover:bg-[#F2ECE0] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-[#FCF8ED] border border-[#B6933E]/20 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#7E8B6C] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-[#7E8B6C]/60">{w.time}</span>
                      </div>
                      <p className="text-[#2E2D24] leading-relaxed text-[11px]">{w.text}</p>
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
