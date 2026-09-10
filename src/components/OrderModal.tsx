import React, { useState } from 'react';
import { X, Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { DesignItem, PACKAGES, formatWhatsAppOrderUrl, OrderRequest } from '../data/wedlinkData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDesign: DesignItem | null;
  designs: DesignItem[];
  whatsappNumber: string;
  onOrderSubmitted: (order: OrderRequest) => void;
  initialNames?: { groom: string; bride: string };
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedDesign,
  designs,
  whatsappNumber,
  onOrderSubmitted,
  initialNames
}) => {
  if (!isOpen) return null;

  const currentDesign = selectedDesign || designs[0];

  const [activeDesignSlug, setActiveDesignSlug] = useState<string>(currentDesign?.slug || 'anasandrama');
  const [packageType, setPackageType] = useState<'silver' | 'gold' | 'diamond'>('gold');
  const [eventType, setEventType] = useState<string>(currentDesign?.cat === 'henna' ? 'حناء' : currentDesign?.cat === 'grad' ? 'تخرج' : 'عرس');
  const [groomName, setGroomName] = useState<string>(initialNames?.groom || (currentDesign?.sampleInvite?.groom || ''));
  const [brideName, setBrideName] = useState<string>(initialNames?.bride || (currentDesign?.sampleInvite?.bride || ''));
  const [date, setDate] = useState<string>('٢٤ أكتوبر ٢٠٢٦');
  const [time, setTime] = useState<string>('٧:٣٠ مساءً');
  const [hallName, setHallName] = useState<string>('فندق الفورسيزونز · قاعة الثريا');
  const [city, setCity] = useState<string>('عمّان');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [includeCountdown, setIncludeCountdown] = useState<boolean>(true);
  const [includeRsvp, setIncludeRsvp] = useState<boolean>(packageType !== 'silver');
  const [includePersonalGuestLinks, setIncludePersonalGuestLinks] = useState<boolean>(packageType === 'diamond');
  const [includeWishesWall, setIncludeWishesWall] = useState<boolean>(packageType === 'diamond');

  const chosenDesignObj = designs.find(d => d.slug === activeDesignSlug) || currentDesign;
  const chosenPackageObj = PACKAGES.find(p => p.id === packageType) || PACKAGES[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: OrderRequest = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      createdAt: new Date().toLocaleString('ar-JO'),
      designSlug: chosenDesignObj.slug,
      designName: chosenDesignObj.name,
      packageType,
      category: eventType,
      groomOrHostName: groomName,
      brideName: eventType !== 'تخرج' ? brideName : undefined,
      date,
      time,
      hallName,
      city,
      phone,
      notes,
      includeCountdown,
      includeRsvp,
      includePersonalGuestLinks,
      includeWishesWall,
      totalPrice: `${chosenPackageObj.priceJod} د.أ`
    };

    onOrderSubmitted(orderData);

    // Open WhatsApp directly
    const waUrl = formatWhatsAppOrderUrl(orderData, whatsappNumber);
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div
      id="order-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24211D]/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white border border-[#E6E1D8] rounded-2xl shadow-xl overflow-hidden my-auto p-5 sm:p-7 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6E1D8] mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EEE7] border border-[#B08D57]/30 text-xs text-[#24211D] font-serif font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
              <span>طلب دعوة إلكترونية فاخرة</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#24211D]">
              تخصيص وطلب الدعوة
            </h3>
            <p className="text-xs text-[#716B62] mt-1">
              أدخل التفاصيل أدناه وسيتولى فريق منصة دعوتك تجهيز رابط دعوتكم ومتابعتها معكم حتى الاعتماد.
            </p>
          </div>

          <button
            id="close-order-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Design */}
          <div>
            <label className="block text-xs font-bold text-[#24211D] mb-2">
              ١. التصميم المختار
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {designs.slice(0, 8).map((d) => (
                <button
                  type="button"
                  key={d.slug}
                  onClick={() => {
                    setActiveDesignSlug(d.slug);
                    if (d.cat === 'henna') setEventType('حناء');
                    else if (d.cat === 'grad') setEventType('تخرج');
                    else setEventType('عرس');
                  }}
                  className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 ${
                    activeDesignSlug === d.slug
                      ? 'bg-[#F1EEE7] border-2 border-[#B08D57] text-[#24211D]'
                      : 'bg-[#F8F6F1] border-[#E6E1D8] text-[#716B62] hover:border-[#B08D57]'
                  }`}
                >
                  <img
                    src={d.thumb}
                    alt={d.name}
                    className="w-8 h-8 rounded-lg object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="block text-[11px] font-semibold truncate text-[#24211D]">
                      {d.name}
                    </span>
                    <span className="block text-[9px] text-[#716B62] truncate">
                      {d.cat === 'wedding' ? 'عرس' : d.cat === 'henna' ? 'حناء' : 'تخرج'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Package Tier */}
          <div>
            <label className="block text-xs font-bold text-[#24211D] mb-2">
              ٢. اختر الباقة المناسبة
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setPackageType(pkg.id);
                    if (pkg.id === 'silver') {
                      setIncludeRsvp(false);
                      setIncludePersonalGuestLinks(false);
                      setIncludeWishesWall(false);
                    } else if (pkg.id === 'gold') {
                      setIncludeRsvp(true);
                      setIncludePersonalGuestLinks(false);
                    } else {
                      setIncludeRsvp(true);
                      setIncludePersonalGuestLinks(true);
                      setIncludeWishesWall(true);
                    }
                  }}
                  className={`cursor-pointer p-3.5 rounded-xl border transition-all relative flex flex-col justify-between ${
                    packageType === pkg.id
                      ? 'bg-[#F1EEE7] border-2 border-[#B08D57]'
                      : 'bg-white border border-[#E6E1D8] hover:border-[#B08D57]'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 right-3 text-[9px] font-serif font-bold px-2 py-0.5 rounded-full bg-[#D6BE91] text-[#29251F] border border-[#B08D57]">
                      الأكثر طلباً
                    </span>
                  )}
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-xs font-bold text-[#24211D]">{pkg.name}</h4>
                      <span className="font-editorial font-bold text-sm text-[#24211D]">
                        {pkg.priceJod} د.أ
                      </span>
                    </div>
                    <p className="text-[10px] text-[#716B62] leading-relaxed mb-2">
                      {pkg.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#B08D57] font-semibold">
                    <Check className="w-3 h-3" />
                    <span>مختار</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Event Details */}
          <div>
            <label className="block text-xs font-bold text-[#24211D] mb-2">
              ٣. تفاصيل الحفل والمكان
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-[#716B62] mb-1">نوع المناسبة</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                >
                  <option value="عرس">حفل زفاف مبارك</option>
                  <option value="حناء">ليلة حنّاء</option>
                  <option value="تخرج">حفل تخرّج</option>
                  <option value="عقد قران">عقد قران / خطوبة</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#716B62] mb-1">
                  {eventType === 'تخرج' ? 'اسم الخرّيج' : 'اسم العريس'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عمر"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                />
              </div>

              {eventType !== 'تخرج' && (
                <div>
                  <label className="block text-[11px] text-[#716B62] mb-1">اسم العروس</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سارة"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-[#716B62] mb-1">تاريخ الحفل والوقت</label>
                <input
                  type="text"
                  placeholder="مثال: الجمعة ٢٤ أكتوبر - ٧:٣٠ مساءً"
                  value={`${date} · ${time}`}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#716B62] mb-1">اسم القاعة / الفندق والمدينة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: قاعة الفورسيزونز · عمّان"
                  value={`${hallName} (${city})`}
                  onChange={(e) => setHallName(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#716B62] mb-1">رقم الهاتف للتواصل</label>
                <input
                  type="tel"
                  placeholder="مثال: 0791234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-[11px] text-[#716B62] mb-1">ملاحظات أو طلبات خاصة (اختياري)</label>
              <textarea
                rows={2}
                placeholder="تعديل ألوان معينة، إضافة فقرة في برنامج الحفل، إلخ..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-xs text-[#24211D] focus:border-[#B08D57] focus:outline-none"
              />
            </div>
          </div>

          {/* Guarantee & Total */}
          <div className="bg-[#F1EEE7] p-4 rounded-xl border border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-[#716B62]">
              <ShieldCheck className="w-5 h-5 text-[#B08D57] shrink-0" />
              <span>تسليم رابط الدعوة خلال ٢٤ إلى ٤٨ ساعة مع مراجعة مجانية قبل الاعتماد.</span>
            </div>

            <div className="text-left shrink-0">
              <span className="text-[10px] text-[#716B62] block">إجمالي التكلفة التقديرية</span>
              <span className="font-editorial font-bold text-2xl text-[#24211D]">
                {chosenPackageObj.priceJod} د.أ
              </span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="submit-order-whatsapp-btn"
              className="flex-1 py-3 px-5 rounded-xl font-semibold text-sm text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-[#B08D57]/40 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#D6BE91]" />
              <span>إرسال الطلب فوراً عبر واتساب</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl font-medium text-xs text-[#716B62] bg-white border border-[#E6E1D8] hover:bg-[#F8F6F1] hover:text-[#24211D] transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
