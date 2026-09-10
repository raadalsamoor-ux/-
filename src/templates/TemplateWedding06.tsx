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

export const TemplateWedding06: React.FC<TemplateInvitationProps> = ({
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
    <div className="w-full min-h-full bg-[#121212] text-[#F7F5F0] font-sans antialiased flex flex-col items-center justify-start relative select-none">
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-md px-4 py-3 flex items-center justify-between z-30 sticky top-0 bg-[#121212]/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          {onBackToMain && isStandalone && (
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/15 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              <span>الرئيسية</span>
            </button>
          )}
          <span className="text-[11px] font-mono text-white/60 tracking-widest uppercase">
            NOIR MINIMAL · مينيمال نوار
          </span>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-1.5 rounded-full border transition-all ${
            isPlayingMusic 
              ? 'bg-white text-[#121212] border-white' 
              : 'bg-[#1C1C1C] text-white border-white/20'
          }`}
          title={isPlayingMusic ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        >
          {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="w-full max-w-md p-4 sm:p-5 relative z-10">
        {!isEnvelopeOpen ? (
          /* ================= SEALED NOIR ENVELOPE ================= */
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500 my-4">
            {guestName && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/20 text-xs text-white/90">
                دعوة خاصة إلى: <strong className="text-white">{guestName}</strong>
              </div>
            )}

            {/* Noir Minimal Card Mockup */}
            <div 
              onClick={onOpenEnvelope}
              className="group cursor-pointer w-full max-w-[310px] aspect-[4/5] bg-[#1A1A1A] rounded-2xl p-6 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
            >
              <div className="text-center pt-4 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 block mb-2 font-mono">
                  THE WEDDING OF
                </span>
                <h3 className="font-editorial text-2xl font-light text-white tracking-wide leading-relaxed">
                  {coupleTitle}
                </h3>
              </div>

              {/* Minimalist Matte Seal */}
              <div className="my-auto flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white text-[#121212] shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#121212] mb-0.5" />
                    <span className="text-[9px] font-black tracking-widest uppercase">OPEN</span>
                  </div>
                </div>
                <span className="text-xs text-white/60 mt-3 font-mono">
                  اضغط لفتح بطاقة الدعوة
                </span>
              </div>

              <div className="text-[11px] text-white/50 font-mono pb-2 relative z-10">
                {invitation.dateText} · {invitation.city}
              </div>
            </div>

            <p className="text-xs text-white/50 mt-6 max-w-xs leading-relaxed font-sans">
              «يسعدنا حضوركم لتكتمل فرحتنا في هذه الليلة الخاصة»
            </p>
          </div>
        ) : (
          /* ================= OPENED NOIR MINIMAL CARD ================= */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#1A1A1A] rounded-2xl p-5 sm:p-7 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
              <div className="flex justify-end mb-2">
                <button
                  onClick={onOpenEnvelope}
                  className="inline-flex items-center gap-1 text-[10px] text-white/60 hover:text-white bg-white/5 px-2.5 py-1 rounded border border-white/10 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة طي الظرف</span>
                </button>
              </div>

              {guestName && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
                  دعوة خاصة إلى: {guestName}
                </div>
              )}

              <div className="my-2 space-y-1">
                <p className="font-serif text-sm text-white/80 font-bold tracking-widest">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {invitation.quranVerse && (
                  <p className="text-xs font-serif text-white/60 italic leading-relaxed px-3">
                    « {invitation.quranVerse} »
                  </p>
                )}
              </div>

              <div className="w-16 h-[1px] bg-white/20 mx-auto my-4" />

              {invitation.hostsNote && (
                <p className="text-xs text-white/60 mb-2 leading-relaxed">
                  {invitation.hostsNote}
                </p>
              )}

              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono block mb-1">
                {invitation.eventTitle}
              </span>

              <h1 className="text-3xl sm:text-4xl font-editorial font-light text-white my-2 leading-tight">
                {coupleTitle}
              </h1>

              {invitation.invitationNote && (
                <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto my-3">
                  {invitation.invitationNote}
                </p>
              )}

              {/* Countdown */}
              {invitation.hasCountdown && (
                <div className="my-5 p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/50 block mb-2 font-mono tracking-wider">
                    COUNTDOWN
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white/5 rounded-lg py-2 border border-white/10">
                      <span className="block text-lg font-mono font-bold text-white">42</span>
                      <span className="text-[9px] text-white/40">DAYS</span>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2 border border-white/10">
                      <span className="block text-lg font-mono font-bold text-white">08</span>
                      <span className="text-[9px] text-white/40">HOURS</span>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2 border border-white/10">
                      <span className="block text-lg font-mono font-bold text-white">35</span>
                      <span className="text-[9px] text-white/40">MINS</span>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2 border border-white/10">
                      <span className="block text-lg font-mono font-bold text-white">19</span>
                      <span className="text-[9px] text-white/40">SECS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Card */}
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 text-right space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50">تاريخ الحفل</span>
                    <span className="font-semibold text-white text-xs">{invitation.dateText}</span>
                    {invitation.hijriDate && (
                      <span className="block text-[10px] text-white/40">{invitation.hijriDate}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50">التوقيت</span>
                    <span className="font-semibold text-white text-xs">{invitation.timeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 border-t border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-white/50">المكان والقاعة</span>
                    <span className="font-semibold text-white text-xs">{invitation.hall} · {invitation.city}</span>
                  </div>
                </div>
              </div>

              {invitation.googleMapsUrl && (
                <a
                  href={invitation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-[#121212] font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 active:scale-98 transition-all mb-4"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Program Timeline */}
              {invitation.program && invitation.program.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10 text-right">
                  <span className="text-[11px] text-white/60 font-mono block mb-2 uppercase">PROGRAM</span>
                  <div className="space-y-2">
                    {invitation.program.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                        <span className="text-white font-medium">{p.title}</span>
                        <span className="text-white/60 font-mono text-[11px]">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RSVP */}
            {invitation.hasRsvp && (
              <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/15 text-right">
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحضور (RSVP)</span>
                </h3>
                <p className="text-[11px] text-white/60 mb-4">
                  يسرنا تأكيد حضوركم لترتيب المقاعد بأفضل شكل.
                </p>

                {rsvpSubmitted ? (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/20 text-center space-y-1">
                    <p className="text-xs font-bold text-white">تم تسجيل تأكيد حضوركم بنجاح ✨</p>
                    <p className="text-[11px] text-white/60">نتشرف بحضوركم الكريم.</p>
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
                      <label className="text-[11px] text-white/60 block mb-1">اسم الضيف</label>
                      <input
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="اسمكم الكريم"
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          attending 
                            ? 'bg-white text-black border-white' 
                            : 'bg-black/30 text-white/70 border-white/20'
                        }`}
                      >
                        سأحضر بكل سرور
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          !attending 
                            ? 'bg-neutral-800 text-white border-white/40' 
                            : 'bg-black/30 text-white/70 border-white/20'
                        }`}
                      >
                        أعتذر لظرف خاص
                      </button>
                    </div>

                    {attending && (
                      <div>
                        <label className="text-[11px] text-white/60 block mb-1">عدد المقاعد</label>
                        <select
                          value={count}
                          onChange={(e) => setCount(Number(e.target.value))}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 active:scale-98 transition-all"
                    >
                      إرسال تأكيد الحضور
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Wall */}
            {invitation.hasWishesWall && (
              <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/15 text-right">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-white" />
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
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="اكتب أصدق التهاني..."
                    rows={2}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التهنئة</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-white/70 font-medium mb-1">
                        <span>{w.name}</span>
                        <span className="text-[10px] text-white/40">{w.time}</span>
                      </div>
                      <p className="text-white/80 leading-relaxed text-[11px]">{w.text}</p>
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
