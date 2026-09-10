import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  ExternalLink, 
  Download, 
  QrCode, 
  Users, 
  X, 
  Edit3, 
  MessageCircle, 
  Sparkles, 
  Eye, 
  Send,
  Plus
} from 'lucide-react';
import QRCode from 'qrcode';
import { 
  CreatedInvitation, 
  encodeInvitation, 
  formatInvitationBroadcastMessage 
} from '../data/wedlinkData';

interface GeneratedInvitationSuccessModalProps {
  invitation: CreatedInvitation | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (invitation: CreatedInvitation) => void;
  onOpenStandalonePreview: (invitation: CreatedInvitation, guestName?: string) => void;
}

export const GeneratedInvitationSuccessModal: React.FC<GeneratedInvitationSuccessModalProps> = ({
  invitation,
  isOpen,
  onClose,
  onEdit,
  onOpenStandalonePreview,
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'whatsapp' | 'qr' | 'guests'>('link');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  
  // Personalized guests generator state
  const [guestNameInput, setGuestNameInput] = useState('');
  const [personalizedGuests, setPersonalizedGuests] = useState<string[]>([
    'أبو أحمد وعائلته الكريمة',
    'سعادة الدكتور سامي وضيوفه',
    'الخال العزيز أبو راشد'
  ]);
  const [copiedGuestIdx, setCopiedGuestIdx] = useState<number | null>(null);

  // Generate shareable standalone URL
  const getShareUrl = (guestName?: string) => {
    if (!invitation) return '';
    const encoded = encodeInvitation(invitation);
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    let url = `${origin}${pathname}#/view?c=${encoded}`;
    if (guestName && guestName.trim()) {
      url += `&guest=${encodeURIComponent(guestName.trim())}`;
    }
    return url;
  };

  const shareUrl = getShareUrl();

  // Generate QR Code on load
  useEffect(() => {
    if (invitation && isOpen) {
      const url = getShareUrl();
      QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'L',
        color: {
          dark: '#24211D',
          light: '#FFFFFF'
        }
      })
        .then(dataUrl => setQrDataUrl(dataUrl))
        .catch(err => {
          console.warn('QR full URL generation warning, falling back to ID parameter:', err);
          const fallbackUrl = `${window.location.origin}${window.location.pathname}#/view?invite=${encodeURIComponent(invitation.id)}`;
          QRCode.toDataURL(fallbackUrl, {
            width: 400,
            margin: 2,
            errorCorrectionLevel: 'M',
            color: {
              dark: '#24211D',
              light: '#FFFFFF'
            }
          })
            .then(dataUrl => setQrDataUrl(dataUrl))
            .catch(fallbackErr => console.error('Fallback QR generation failed', fallbackErr));
        });
    }
  }, [invitation, isOpen]);

  if (!isOpen || !invitation) return null;

  const coupleTitle = invitation.bride 
    ? `${invitation.groom} & ${invitation.bride}` 
    : invitation.groom;

  const broadcastMessage = formatInvitationBroadcastMessage(invitation, shareUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(broadcastMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Dawatak-${invitation.groom}-${invitation.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAddGuest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!guestNameInput.trim()) return;
    setPersonalizedGuests(prev => [...prev, guestNameInput.trim()]);
    setGuestNameInput('');
  };

  const handleCopyGuestLink = (name: string, index: number) => {
    const url = getShareUrl(name);
    navigator.clipboard.writeText(url);
    setCopiedGuestIdx(index);
    setTimeout(() => setCopiedGuestIdx(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24211D]/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="generated-invitation-modal-card"
        className="relative w-full max-w-2xl bg-white border border-[#E6E1D8] rounded-2xl shadow-xl text-[#24211D] overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#E6E1D8] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F1EEE7] border border-[#B08D57]/30 flex items-center justify-center text-[#B08D57] shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-serif font-semibold bg-[#F1EEE7] text-[#24211D] border border-[#B08D57]/30 mb-1">
                <Check className="w-3 h-3 text-[#B08D57]" />
                <span>تم تجهيز الدعوة بنجاح</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#24211D]">
                دعوتكم الإلكترونية جاهزة للمشاركة
              </h2>
              <p className="text-xs text-[#716B62]">
                {invitation.eventTitle} · {coupleTitle} · {invitation.dateText}
              </p>
            </div>
          </div>

          <button
            id="close-success-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Banner */}
        <div className="bg-[#F8F6F1] px-5 sm:px-6 py-3 border-b border-[#E6E1D8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#716B62]">
            <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
            <span>رابط الدعوة جاهز للاستخدام المباشر دون الحاجة لأي تفعيل</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="preview-as-guest-btn"
              onClick={() => onOpenStandalonePreview(invitation)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all border border-[#B08D57]/40 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#D6BE91]" />
              <span>معاينة كضيف</span>
            </button>
            <button
              id="edit-invitation-btn"
              onClick={() => onEdit(invitation)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-[#24211D] bg-white hover:bg-[#F1EEE7] transition-colors border border-[#E6E1D8]"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#716B62]" />
              <span>تعديل</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 sm:px-6 pt-4 flex gap-3 border-b border-[#E6E1D8] overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 px-2 whitespace-nowrap transition-colors relative ${
              activeTab === 'link' 
                ? 'text-[#24211D] font-bold border-b-2 border-[#B08D57]' 
                : 'text-[#716B62] hover:text-[#24211D]'
            }`}
          >
            الرابط المباشر
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-2.5 px-2 whitespace-nowrap transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'whatsapp' 
                ? 'text-[#24211D] font-bold border-b-2 border-[#B08D57]' 
                : 'text-[#716B62] hover:text-[#24211D]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>رسالة واتساب الجاهزة</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-2 whitespace-nowrap transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'qr' 
                ? 'text-[#24211D] font-bold border-b-2 border-[#B08D57]' 
                : 'text-[#716B62] hover:text-[#24211D]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>رمز QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('guests')}
            className={`pb-2.5 px-2 whitespace-nowrap transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'guests' 
                ? 'text-[#24211D] font-bold border-b-2 border-[#B08D57]' 
                : 'text-[#716B62] hover:text-[#24211D]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>روابط بأسماء الضيوف ({personalizedGuests.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* TAB 1: Direct Link */}
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#716B62] mb-1.5">
                  رابط دعوتك الحصري (يمكن نسخه ومشاركته فوراً):
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8]">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent text-xs text-[#24211D] font-mono select-all outline-none px-2 truncate"
                  />
                  <button
                    id="copy-direct-link-btn"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#29251F] hover:bg-[#1A1814] text-white font-semibold text-xs transition-all whitespace-nowrap active:scale-[0.98] border border-[#B08D57]/30"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D6BE91]" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D6BE91]" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  id="share-whatsapp-btn"
                  href={`https://wa.me/?text=${encodeURIComponent(broadcastMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] transition-all shadow-sm active:scale-[0.98] border border-[#B08D57]/40"
                >
                  <MessageCircle className="w-4 h-4 text-[#D6BE91]" />
                  <span>مشاركة مباشرة عبر واتساب</span>
                </a>

                <button
                  id="open-full-preview-btn"
                  onClick={() => onOpenStandalonePreview(invitation)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-[#24211D] bg-white hover:bg-[#F1EEE7] border border-[#E6E1D8] transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#B08D57]" />
                  <span>فتح الرابط في صفحة مستقلة</span>
                </button>
              </div>

              {/* Quick instructions box */}
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-[11px] text-[#716B62] leading-relaxed space-y-1">
                <p className="font-semibold text-[#24211D]">كيف يستقبل الضيوف دعوتك؟</p>
                <p>• عند فتح الرابط من الهاتف أو الحاسوب، يظهر ظرف ملكي فاخر بختم شمعي تفاعلي ينفتح بلمسة واحدة.</p>
                <p>• تعمل الموسيقى والعد التنازلي وخريطة Google وتأكيد الحضور فوراً.</p>
                {invitation.hostWhatsapp && (
                  <p className="text-[#B08D57] font-medium">
                    • ردود الحضور (RSVP) ستصل إلى واتساب المضيف مباشرة: {invitation.hostWhatsapp}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Ready WhatsApp Message */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#716B62]">
                    نص رسالة الواتساب الجاهزة للإرسال للأهل والأصدقاء:
                  </label>
                  <button
                    id="copy-whatsapp-message-btn"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-xs text-[#B08D57] font-semibold hover:underline"
                  >
                    {copiedMsg ? (
                      <>
                        <Check className="w-3 h-3 text-[#B08D57]" />
                        <span>تم نسخ الرسالة!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ الرسالة</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] font-sans leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                  {broadcastMessage}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(broadcastMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] transition-colors shadow-sm border border-[#B08D57]/30"
                >
                  <MessageCircle className="w-4 h-4 text-[#D6BE91]" />
                  <span>فتح واتساب وإرسال الرسالة فوراً</span>
                </a>
                <button
                  onClick={handleCopyMessage}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#24211D] bg-white hover:bg-[#F1EEE7] border border-[#E6E1D8]"
                >
                  {copiedMsg ? 'تم النسخ' : 'نسخ الرسالة فقط'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: QR Code */}
          {activeTab === 'qr' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 p-2">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-[#E6E1D8]">
                {qrDataUrl ? (
                  <img 
                    src={qrDataUrl} 
                    alt="Wedding Invitation QR Code" 
                    className="w-44 h-44 rounded-xl"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-xs text-[#716B62]">
                    جاري توليد الرمز...
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 text-center sm:text-right">
                <h4 className="text-base font-bold font-editorial text-[#24211D]">
                  رمز QR Code خاص بالدعوة
                </h4>
                <p className="text-xs text-[#716B62] leading-relaxed">
                  يمكنك تنزيل هذا الرمز وطباعته على بطاقات الدعوة الورقية، أو لافتة استقبال القاعة (Welcome Board)، ليمسحه الضيوف بكاميرا هواتفهم ويفتحوا تفاصيل الحفل مباشرة.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    id="download-qr-btn"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] transition-colors shadow-sm border border-[#B08D57]/40"
                  >
                    <Download className="w-4 h-4 text-[#D6BE91]" />
                    <span>تحميل رمز الـ QR (صورة PNG)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Personalized Guest Links */}
          {activeTab === 'guests' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#716B62] leading-relaxed">
                <p className="font-semibold text-[#24211D] mb-1">
                  ميزة الروابط المخصصة بالاسم (VIP Guests):
                </p>
                <p>
                  اكتب اسم ضيفك، وسيقوم الموقع بتوليد رابط ورسالة خاصة يظهر فيها اسمه على ظرف الدعوة الملكي مباشرة.
                </p>
              </div>

              {/* Add guest input */}
              <form onSubmit={handleAddGuest} className="flex gap-2">
                <input
                  type="text"
                  placeholder="مثال: د. ماجد السالم، خالي أبو طارق..."
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#24211D] placeholder:text-[#716B62] focus:border-[#B08D57] focus:bg-white outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#29251F] hover:bg-[#1A1814] text-white font-semibold text-xs whitespace-nowrap transition-colors border border-[#B08D57]/30"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D6BE91]" />
                  <span>إضافة ضيف</span>
                </button>
              </form>

              {/* Guest links list */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {personalizedGuests.map((guest, idx) => {
                  const guestUrl = getShareUrl(guest);
                  const guestMsg = formatInvitationBroadcastMessage(invitation, guestUrl, guest);

                  return (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#24211D] truncate">{guest}</p>
                        <p className="text-[10px] text-[#716B62] truncate font-mono">{guestUrl}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleCopyGuestLink(guest, idx)}
                          title="نسخ رابط الضيف"
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F1EEE7] text-[#24211D] border border-[#E6E1D8] text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          {copiedGuestIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-[#B08D57]" />
                              <span className="text-[#B08D57] font-semibold">تم!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#716B62]" />
                              <span>نسخ الرابط</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(guestMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="إرسال عبر واتساب"
                          className="p-1.5 rounded-lg bg-white hover:bg-[#F1EEE7] text-[#B08D57] border border-[#E6E1D8] transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => onOpenStandalonePreview(invitation, guest)}
                          title="معاينة باسم هذا الضيف"
                          className="p-1.5 rounded-lg bg-white hover:bg-[#F1EEE7] text-[#24211D] border border-[#E6E1D8] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#716B62]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E6E1D8] bg-[#F8F6F1] flex items-center justify-between gap-3 text-xs">
          <div className="text-[11px] text-[#716B62]">
            تم حفظ دعوتك محلياً في متصفحك ويمكنك الرجوع إليها وتعديلها في أي وقت.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F1EEE7] text-[#24211D] border border-[#E6E1D8] font-medium transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
