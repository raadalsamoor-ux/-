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

export const TemplateWedding05: React.FC<TemplateInvitationProps> = ({
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
    <div className="w-full min-h-full bg-[#FFF5F5] text-[#3D2B2E] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#FFF5F5]/90 backdrop-blur-md border-b border-[#DF7A86]/25">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#B7707E] hover:text-[#3D2B2E] px-2 py-1 rounded bg-white border border-[#DF7A86]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#B7707E] tracking-wider uppercase">
            Pastel Blossom · الوردي الرومانسي
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#DF7A86] text-white border-[#DF7A86]' 
              : 'bg-white text-[#B7707E] border-[#DF7A86]/30'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED BLUSH ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-white border border-[#DF7A86]/30 text-xs text-[#B7707E]">
                دعوة خاصة إلى: <strong className="text-[#3D2B2E]">{guestName}</strong>
              </div>
            )}

            {/* Blush Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-white rounded-3xl p-6 border border-[#DF7A86]/40 shadow-[0_16px_36px_rgba(223,122,134,0.18)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B7707E] block mb-2 font-serif">
                  WEDDING CELEBRATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#3D2B2E] leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Rose Wax Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D66C79] to-[#E996A0] p-1 shadow-[0_8px_20px_rgba(214,108,121,0.35)] group-hover:scale-105 transition-transform flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-full border border-white/40 flex flex-col items-center justify-center">
                    <Heart className="w-4 h-4 text-white mb-0.5 fill-white" />
                    <span className="text-[9px] font-bold tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#B7707E] mt-3 font-medium">
                  انقري لفتح بطاقة الدعوة
                </span>
              </div>

              <div className="text-[11px] text-[#B7707E] font-light pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#B7707E] mt-6 max-w-xs leading-relaxed font-serif">
              «فرحتنا لا تكتمل إلا بوجودكم بيننا ومشاركتنا أبهى اللحظات»
            </p>
          </div>
        ) : (
          /* ================= OPENED BLUSH CARD ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#DF7A86]/30 shadow-[0_12px_32px_rgba(223,122,134,0.12)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#B7707E] hover:text-[#3D2B2E] bg-[#FFF5F5] px-2.5 py-1 rounded-full border border-[#DF7A86]/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#FFF5F5] border border-[#DF7A86]/30 text-xs font-semibold text-[#B7707E]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              <div className="my-2 space-y-1">
                <p className="font-serif text-sm text-[#DF7A86] font-bold tracking-wider">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-[#705256] italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-20 h-[1px] bg-[#DF7A86]/30 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-[#B7707E] mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#DF7A86] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#3D2B2E] my-2 leading-tight">
                {coupleTitle}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-[#705256] leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-2xl bg-[#FFF5F5] border border-[#DF7A86]/25">
                  <span className="text-[10px] text-[#B7707E] block mb-2 font-medium">
                    الوقت المتبقي على يوم الزفاف
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white rounded-xl py-2 border border-[#DF7A86]/20">
                      <span className="block text-lg font-bold text-[#DF7A86]">42</span>
                      <span className="text-[9px] text-[#B7707E]">يوم</span>
                    </div>
                    <div className="bg-white rounded-xl py-2 border border-[#DF7A86]/20">
                      <span className="block text-lg font-bold text-[#DF7A86]">08</span>
                      <span className="text-[9px] text-[#B7707E]">ساعة</span>
                    </div>
                    <div className="bg-white rounded-xl py-2 border border-[#DF7A86]/20">
                      <span className="block text-lg font-bold text-[#DF7A86]">35</span>
                      <span className="text-[9px] text-[#B7707E]">دقيقة</span>
                    </div>
                    <div className="bg-white rounded-xl py-2 border border-[#DF7A86]/20">
                      <span className="block text-lg font-bold text-[#DF7A86]">19</span>
                      <span className="text-[9px] text-[#B7707E]">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Details */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F5] border border-[#DF7A86]/20 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DF7A86]/30 flex items-center justify-center text-[#DF7A86] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#B7707E]">تاريخ الحفل</span>
                    <span className="font-semibold text-[#3D2B2E] text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#B7707E]">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DF7A86]/30 flex items-center justify-center text-[#DF7A86] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#B7707E]">الساعة</span>
                    <span className="font-semibold text-[#3D2B2E] text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#DF7A86]/15">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DF7A86]/30 flex items-center justify-center text-[#DF7A86] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#B7707E]">المكان</span>
                    <span className="font-semibold text-[#3D2B2E] text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#DF7A86] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D06572] active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#DF7A86]/15 text-right">
                  <span className="text-[11px] text-[#B7707E] font-semibold block mb-2">برنامج الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-[#FFF5F5] border border-[#DF7A86]/15 text-xs">
                        <span className="text-[#3D2B2E] font-medium">{p.title}</span>
                        <span className="text-[#DF7A86] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP */}
            {invitation.hasRsvp && (
              <div className="bg-white rounded-3xl p-5 border border-[#DF7A86]/25 text-right shadow-sm">
                <h3 className="text-sm font-bold text-[#3D2B2E] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DF7A86]" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#B7707E] mb-4">
                  يسعدنا معرفة حضوركم لضمان راحة جميع الضيوف.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#DF7A86]/30 text-center space-y-1">
                    <p className="text-xs font-bold text-[#DF7A86]">تم استلام تأكيد حضوركم بكل محبة 🌸</p>
                    <p className="text-[11px] text-[#705256]">ننتظركم بكل شوق لمشاركتنا الفرحة.</p>
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
                      <label className="text-[11px] text-[#B7707E] block mb-1">اسم الضيف</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-[#FFF5F5] border border-[#DF7A86]/30 rounded-xl px-3 py-2 text-xs text-[#3D2B2E] focus:outline-none focus:border-[#DF7A86]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#DF7A86] text-white border-[#DF7A86]' 
                            : 'bg-[#FFF5F5] text-[#3D2B2E] border-[#DF7A86]/30'
                        }`}
                      >
                        سأحضر بحب
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#B7707E] text-white border-[#B7707E]' 
                            : 'bg-[#FFF5F5] text-[#3D2B2E] border-[#DF7A86]/30'
                        }`}
                      >
                        أعتذر عن الحضور
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#B7707E] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#FFF5F5] border border-[#DF7A86]/30 rounded-xl px-3 py-2 text-xs text-[#3D2B2E] focus:outline-none focus:border-[#DF7A86]"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#3D2B2E] text-white font-bold text-xs hover:bg-[#2A1D20] active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-white rounded-3xl p-5 border border-[#DF7A86]/25 text-right shadow-sm">
                <h3 className="text-sm font-bold text-[#3D2B2E] mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#DF7A86]" />
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
                    className="w-full bg-[#FFF5F5] border border-[#DF7A86]/30 rounded-xl px-3 py-1.5 text-xs text-[#3D2B2E] focus:outline-none focus:border-[#DF7A86]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتبي كلمة جميلة للعروسين..."
                    rows={2}
                    required
                    className="w-full bg-[#FFF5F5] border border-[#DF7A86]/30 rounded-xl px-3 py-1.5 text-xs text-[#3D2B2E] focus:outline-none focus:border-[#DF7A86]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#FFF5F5] border border-[#DF7A86]/30 text-xs font-semibold text-[#DF7A86] hover:bg-[#FFEAEB] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-xl bg-[#FFF5F5] border border-[#DF7A86]/15 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#DF7A86] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-[#B7707E]/70">{w.time}</span>
                      </div>
                      <p className="text-[#3D2B2E] leading-relaxed text-[11px]">{w.text}</p>
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
