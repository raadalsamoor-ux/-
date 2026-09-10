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
  ChevronLeft,
  Award
} from 'lucide-react';
import { TemplateInvitationProps } from './types';

export const TemplateGrad01: React.FC<TemplateInvitationProps> = ({
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

  const graduateName = invitation.groom || invitation.bride;

  return (
    <div className="w-full min-h-full bg-[#0B1B3D] text-[#F8F9FA] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#0B1B3D]/95 backdrop-blur-md border-b border-[#E5A93C]/30">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-[#E5A93C] hover:text-white px-2 py-1 rounded bg-[#1D3557] border border-[#E5A93C]/30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-serif text-[#E5A93C] tracking-wider uppercase">
            Royal Graduation · وسام التخرج
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-[#E5A93C] text-[#0B1B3D] border-[#E5A93C]' 
              : 'bg-[#1D3557] text-[#E5A93C] border-[#E5A93C]/40'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED GRADUATION ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#1D3557] border border-[#E5A93C]/40 text-xs text-[#E5A93C]">
                دعوة خاصة ومميزة إلى: <strong className="text-white">{guestName}</strong>
              </div>
            )}

            {/* Graduation Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-gradient-to-b from-[#1D3557] to-[#0A1633] rounded-2xl p-6 border-2 border-[#E5A93C] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5A93C] block mb-2 font-serif">
                  GRADUATION CELEBRATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white leading-relaxed">
                  حفل تخرّج {graduateName}
                </h3>
              </div>

              {/* Graduation Gold Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B38025] via-[#F7C86A] to-[#E5A93C] p-1 shadow-[0_8px_25px_rgba(229,169,60,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center text-[#0B1B3D]">
                  <div className="w-full h-full rounded-full border border-[#0B1B3D]/30 flex flex-col items-center justify-center">
                    <Award className="w-5 h-5 text-[#0B1B3D] mb-0.5" />
                    <span className="text-[9px] font-black tracking-tight">افتح</span>
                  </div>
                </div>
                <span className="text-xs text-[#E5A93C] mt-3 font-medium">
                  انقر لفتح وسام دعوة التخرّج
                </span>
              </div>

              <div className="text-[11px] text-[#E5A93C]/80 font-light pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-[#F8F9FA]/70 mt-6 max-w-xs leading-relaxed font-serif">
              «تتويجاً لسنوات من الجد والاجتهاد، نتشرف بدعوتكم لحفل التخرج»
            </p>
          </div>
        ) : (
          /* ================= OPENED GRADUATION CARD ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-b from-[#162A52] to-[#0D1D3E] rounded-2xl p-5 sm:p-7 border border-[#E5A93C]/40 shadow-[0_16px_40px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-[#E5A93C] hover:text-white bg-[#0B1B3D]/70 px-2.5 py-1 rounded border border-[#E5A93C]/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-[#1D3557] border border-[#E5A93C]/40 text-xs font-semibold text-[#E5A93C]">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              <div className="my-2 space-y-1">
                <p className="font-serif text-sm text-[#E5A93C] font-bold tracking-widest">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-[#F8F9FA]/80 italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-24 h-[1px] bg-[#E5A93C]/40 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-[#E5A93C] mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E5A93C] font-semibold block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white my-2 leading-tight">
                تخرّج {graduateName}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-[#F8F9FA]/80 leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-xl bg-[#0B1B3D]/80 border border-[#E5A93C]/30">
                  <span className="text-[10px] text-[#E5A93C] block mb-2 font-medium">
                    المتبقي على لحظة التتويج والتخرج
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#1D3557] rounded-lg py-2 border border-[#E5A93C]/20">
                      <span className="block text-lg font-bold text-[#E5A93C]">42</span>
                      <span className="text-[9px] text-[#F8F9FA]/60">يوم</span>
                    </div>
                    <div className="bg-[#1D3557] rounded-lg py-2 border border-[#E5A93C]/20">
                      <span className="block text-lg font-bold text-[#E5A93C]">08</span>
                      <span className="text-[9px] text-[#F8F9FA]/60">ساعة</span>
                    </div>
                    <div className="bg-[#1D3557] rounded-lg py-2 border border-[#E5A93C]/20">
                      <span className="block text-lg font-bold text-[#E5A93C]">35</span>
                      <span className="text-[9px] text-[#F8F9FA]/60">دقيقة</span>
                    </div>
                    <div className="bg-[#1D3557] rounded-lg py-2 border border-[#E5A93C]/20">
                      <span className="block text-lg font-bold text-[#E5A93C]">19</span>
                      <span className="text-[9px] text-[#F8F9FA]/60">ثانية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Card */}
              <div className="p-3.5 rounded-xl bg-[#0B1B3D]/60 border border-[#E5A93C]/25 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D3557] border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E5A93C]">تاريخ الحفل</span>
                    <span className="font-semibold text-white text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-[#F8F9FA]/60">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D3557] border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E5A93C]">التوقيت</span>
                    <span className="font-semibold text-white text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-[#E5A93C]/20">
                  <div className="w-8 h-8 rounded-lg bg-[#1D3557] border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-[#E5A93C]">المكان والقاعة</span>
                    <span className="font-semibold text-white text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B38025] via-[#E5A93C] to-[#B38025] text-[#0B1B3D] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#E5A93C]/20 text-right">
                  <span className="text-[11px] text-[#E5A93C] font-semibold block mb-2">فقرات وبرنامج الحفل</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#0B1B3D]/70 border border-[#E5A93C]/20 text-xs">
                        <span className="text-white font-medium">{p.title}</span>
                        <span className="text-[#E5A93C] font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP */}
            {invitation.hasRsvp && (
              <div className="bg-[#162A52] rounded-2xl p-5 border border-[#E5A93C]/30 text-right shadow-lg">
                <h3 className="text-sm font-bold text-[#E5A93C] mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-[#F8F9FA]/70 mb-4">
                  يسرنا تأكيد حضوركم لترتيب المقاعد بأفضل شكل.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#0B1B3D] border border-[#E5A93C]/40 text-center space-y-1">
                    <p className="text-xs font-bold text-[#E5A93C]">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-[#F8F9FA]/70">نتشرف بمشاركتكم لنا فرحة التخرج.</p>
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
                      <label className="text-[11px] text-[#E5A93C] block mb-1">اسم الضيف</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-[#0B1B3D] border border-[#E5A93C]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-[#E5A93C] text-[#0B1B3D] border-[#E5A93C]' 
                            : 'bg-[#0B1B3D] text-white/70 border-[#E5A93C]/30'
                        }`}
                      >
                        سأحضر بكل سرور
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-[#1D3557] text-[#E5A93C] border-[#E5A93C]' 
                            : 'bg-[#0B1B3D] text-white/70 border-[#E5A93C]/30'
                        }`}
                      >
                        أعتذر لظرف خاص
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-[#E5A93C] block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-[#0B1B3D] border border-[#E5A93C]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#E5A93C] text-[#0B1B3D] font-bold text-xs hover:brightness-105 active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#162A52] rounded-2xl p-5 border border-[#E5A93C]/30 text-right shadow-lg">
                <h3 className="text-sm font-bold text-[#E5A93C] mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E5A93C]" />
                  <span>تهاني ومباركات التخرّج</span>
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
                    className="w-full bg-[#0B1B3D] border border-[#E5A93C]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب أصدق التهاني بالنجاح والتخرج..."
                    rows={2}
                    required
                    className="w-full bg-[#0B1B3D] border border-[#E5A93C]/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#0B1B3D] border border-[#E5A93C]/40 text-xs font-semibold text-[#E5A93C] hover:bg-[#12254C] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-[#0B1B3D] border border-[#E5A93C]/20 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#E5A93C] font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-white/40">{w.time}</span>
                      </div>
                      <p className="text-[#F8F9FA]/90 leading-relaxed text-[11px]">{w.text}</p>
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
