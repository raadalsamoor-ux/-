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

export const TemplateWedding04: React.FC<TemplateInvitationProps> = ({
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
    <div className="w-full min-h-full bg-[#0B2B20] text-[#F5EFE6] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#0B2B20]/90 backdrop-blur-md border-b border-[#E2C992]/30">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#E2C992] hover:text-white px-2 py-1 rounded bg-[#143D2E] border border-[#E2C992]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#E2C992] tracking-wider uppercase">
            Noble Emerald · الزمردي النبيل
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#E2C992] text-[#0B2B20] border-[#E2C992]' 
              : 'bg-[#143D2E] text-[#E2C992] border-[#E2C992]/40'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED EMERALD ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#143D2E] border border-[#E2C992]/40 text-xs text-[#E2C992]">
                دعوة خاصة إلى: <strong className="text-white">{guestName}</strong>
              </div>
            )}

            {/* Emerald Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-gradient-to-b from-[#143D2E] to-[#081F17] rounded-2xl p-6 border-2 border-[#E2C992]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Arch Motif Corner Frames */}
              <div className="absolute inset-3 border border-[#E2C992]/30 rounded-xl pointer-events-none" />

              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2C992] block mb-2 font-serif">
                  ROYAL WEDDING INVITATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Emerald & Gold Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1A533E] via-[#2A7558] to-[#123E2E] border-2 border-[#E2C992] p-1 shadow-[0_8px_25px_rgba(226,201,146,0.3)] group-hover:scale-105 transition-transform flex items-center justify-center text-[#E2C992]">
                  <div className="w-full h-full rounded-full border border-[#E2C992]/40 flex flex-col items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#E2C992] mb-0.5" />
                    <span className="text-[9px] font-bold tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#E2C992] mt-3 font-medium">
                  اضغط لفتح بطاقة الدعوة
                </span>
              </div>

              <div className="text-[11px] text-[#E2C992]/80 font-light pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#F5EFE6]/70 mt-6 max-w-xs leading-relaxed font-serif">
              «يسرّنا ويسعدنا حضوركم ومشاركتكم أفراحنا المباركة»
            </p>
          </div>
        ) : (
          /* ================= OPENED EMERALD CARD ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-b from-[#11382A] to-[#092219] rounded-2xl p-5 sm:p-7 border border-[#E2C992]/40 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#E2C992] hover:text-white bg-[#0B2B20]/70 px-2.5 py-1 rounded border border-[#E2C992]/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#143D2E] border border-[#E2C992]/40 text-xs font-semibold text-[#E2C992]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              <div className="my-2 space-y-1">
                <p className="font-serif text-sm text-[#E2C992] font-bold tracking-widest">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-[#F5EFE6]/90 italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-24 h-[1px] bg-[#E2C992]/40 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-[#E2C992] mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E2C992] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white my-2 leading-tight">
                {coupleTitle}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-[#F5EFE6]/80 leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-xl bg-[#081F17]/80 border border-[#E2C992]/30">
                  <span className="text-[10px] text-[#E2C992] block mb-2 font-medium">
                    الوقت المتبقي حتى موعد الحفل
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#143D2E] rounded-lg py-2 border border-[#E2C992]/20">
                      <span className="block text-lg font-bold text-[#E2C992]">42</span>
                      <span className="text-[9px] text-[#F5EFE6]/60">يوم</span>
                    </div>
                    <div className="bg-[#143D2E] rounded-lg py-2 border border-[#E2C992]/20">
                      <span className="block text-lg font-bold text-[#E2C992]">08</span>
                      <span className="text-[9px] text-[#F5EFE6]/60">ساعة</span>
                    </div>
                    <div className="bg-[#143D2E] rounded-lg py-2 border border-[#E2C992]/20">
                      <span className="block text-lg font-bold text-[#E2C992]">35</span>
                      <span className="text-[9px] text-[#F5EFE6]/60">دقيقة</span>
                    </div>
                    <div className="bg-[#143D2E] rounded-lg py-2 border border-[#E2C992]/20">
                      <span className="block text-lg font-bold text-[#E2C992]">19</span>
                      <span className="text-[9px] text-[#F5EFE6]/60">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Card */}
              <div className="p-3.5 rounded-xl bg-[#081F17]/60 border border-[#E2C992]/25 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#143D2E] border border-[#E2C992]/40 flex items-center justify-center text-[#E2C992] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E2C992]">تاريخ المناسبة</span>
                    <span className="font-semibold text-white text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#F5EFE6]/60">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#143D2E] border border-[#E2C992]/40 flex items-center justify-center text-[#E2C992] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E2C992]">التوقيت</span>
                    <span className="font-semibold text-white text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#E2C992]/20">
                  <div className="w-8 h-8 rounded-lg bg-[#143D2E] border border-[#E2C992]/40 flex items-center justify-center text-[#E2C992] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#E2C992]">القاعة والمكان</span>
                    <span className="font-semibold text-white text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C2A362] via-[#E2C992] to-[#C2A362] text-[#0B2B20] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-105 active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#E2C992]/20 text-right">
                  <span className="text-[11px] text-[#E2C992] font-semibold block mb-2">برنامج وفقرات الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#081F17]/70 border border-[#E2C992]/20 text-xs">
                        <span className="text-white font-medium">{p.title}</span>
                        <span className="text-[#E2C992] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP */}
            {invitation.hasRsvp && (
              <div className="bg-[#11382A] rounded-2xl p-5 border border-[#E2C992]/30 text-right shadow-lg">
                <h3 className="text-sm font-bold text-[#E2C992] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#F5EFE6]/70 mb-4">
                  يسعدنا تأكيد حضوركم لترتيب المقاعد على أكمل وجه.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#081F17] border border-[#E2C992]/40 text-center space-y-1">
                    <p className="text-xs font-bold text-[#E2C992]">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-[#F5EFE6]/70">أهلاً وسهلاً بكم، وبكم تكتمل فرحتنا.</p>
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
                      <label className="text-[11px] text-[#E2C992] block mb-1">اسم الضيف أو العائلة</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-[#081F17] border border-[#E2C992]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E2C992]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#E2C992] text-[#0B2B20] border-[#E2C992]' 
                            : 'bg-[#081F17] text-white/70 border-[#E2C992]/30'
                        }`}
                      >
                        سأحضر بكل سرور
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#143D2E] text-[#E2C992] border-[#E2C992]' 
                            : 'bg-[#081F17] text-white/70 border-[#E2C992]/30'
                        }`}
                      >
                        أعتذر لظرف خاص
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#E2C992] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#081F17] border border-[#E2C992]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E2C992]"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#E2C992] text-[#0B2B20] font-bold text-xs hover:brightness-105 active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#11382A] rounded-2xl p-5 border border-[#E2C992]/30 text-right shadow-lg">
                <h3 className="text-sm font-bold text-[#E2C992] mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E2C992]" />
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
                    className="w-full bg-[#081F17] border border-[#E2C992]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E2C992]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب تهنئتكم الكريمة..."
                    rows={2}
                    required
                    className="w-full bg-[#081F17] border border-[#E2C992]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E2C992]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#081F17] border border-[#E2C992]/40 text-xs font-semibold text-[#E2C992] hover:bg-[#143D2E] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-[#081F17] border border-[#E2C992]/20 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#E2C992] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-white/40">{w.time}</span>
                      </div>
                      <p className="text-[#F5EFE6]/90 leading-relaxed text-[11px]">{w.text}</p>
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
