import React, { useState } from 'react';
import { X, Lock, Save, Download, RotateCcw, CheckCircle2 } from 'lucide-react';
import { WedLinkData, OrderRequest } from '../data/wedlinkData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WedLinkData;
  onSaveData: (newData: WedLinkData) => void;
  onResetDefaults: () => void;
  orders: OrderRequest[];
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetDefaults,
  orders
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Editable local state
  const [currentTab, setCurrentTab] = useState<'brand' | 'designs' | 'orders' | 'export'>('brand');
  const [brandName, setBrandName] = useState(data.brand.name);
  const [brandLatin, setBrandLatin] = useState(data.brand.latin);
  const [whatsapp, setWhatsapp] = useState(data.brand.whatsapp);
  const [instagram, setInstagram] = useState(data.brand.instagram);
  const [facebook, setFacebook] = useState(data.brand.facebook);
  const [heroTitle, setHeroTitle] = useState(data.hero.title);
  const [heroLead, setHeroLead] = useState(data.hero.lead);

  const [savedToast, setSavedToast] = useState(false);

  // Simple password authorization (supports 'wedlink', '1234', 'admin', 'dawatak')
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passwordInput.trim().toLowerCase();
    if (clean === 'wedlink' || clean === '1234' || clean === 'admin' || clean === '123456' || clean === 'dawatak') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة. (جرّب: wedlink أو 1234)');
    }
  };

  const handleSaveBrand = () => {
    const updated: WedLinkData = {
      ...data,
      brand: {
        ...data.brand,
        name: brandName,
        latin: brandLatin,
        whatsapp,
        instagram,
        facebook
      },
      hero: {
        ...data.hero,
        title: heroTitle,
        lead: heroLead
      }
    };
    onSaveData(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="admin-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#24211D]/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-white border border-[#E6E1D8] rounded-2xl shadow-xl overflow-hidden my-auto p-5 sm:p-7 max-h-[90vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E1D8] mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F1EEE7] border border-[#B08D57]/30 flex items-center justify-center text-[#B08D57]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-lg text-[#24211D]">لوحة التحكم · إدارة منصة دعوتك</h3>
              <p className="text-[11px] text-[#716B62]">تعديل معلومات العلامة والواتساب واستعراض طلبات الزوار</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-sm mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-[#F1EEE7] border border-[#B08D57]/30 flex items-center justify-center mx-auto mb-4 text-[#B08D57]">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-editorial font-bold text-xl text-[#24211D] mb-1">تسجيل دخول المسؤول</h4>
            <p className="text-xs text-[#716B62] mb-6">
              أدخل كلمة المرور للوصول إلى إعدادات الموقع والطلبات. (كلمة المرور: wedlink أو 1234)
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                placeholder="كلمة المرور (مثال: 1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 text-center text-sm text-[#24211D] focus:border-[#B08D57] focus:outline-none"
              />

              {loginError && (
                <p className="text-[11px] text-[#DC2626]">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#29251F] font-semibold text-xs text-white hover:bg-[#1A1814] transition-colors border border-[#B08D57]/30 shadow-xs"
              >
                دخول
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E6E1D8] pb-3 mb-4 shrink-0 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setCurrentTab('brand')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentTab === 'brand'
                    ? 'bg-[#29251F] text-white'
                    : 'bg-[#F8F6F1] text-[#716B62] hover:bg-[#E6E1D8] hover:text-[#24211D]'
                }`}
              >
                بيانات العلامة والتواصل
              </button>
              <button
                onClick={() => setCurrentTab('orders')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'orders'
                    ? 'bg-[#29251F] text-white'
                    : 'bg-[#F8F6F1] text-[#716B62] hover:bg-[#E6E1D8] hover:text-[#24211D]'
                }`}
              >
                <span>الطلبات الواردة</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#B08D57] text-white">
                  {orders.length}
                </span>
              </button>
              <button
                onClick={() => setCurrentTab('designs')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentTab === 'designs'
                    ? 'bg-[#29251F] text-white'
                    : 'bg-[#F8F6F1] text-[#716B62] hover:bg-[#E6E1D8] hover:text-[#24211D]'
                }`}
              >
                التصاميم ({data.designs.length})
              </button>
              <button
                onClick={() => setCurrentTab('export')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentTab === 'export'
                    ? 'bg-[#29251F] text-white'
                    : 'bg-[#F8F6F1] text-[#716B62] hover:bg-[#E6E1D8] hover:text-[#24211D]'
                }`}
              >
                تصدير وإعادة ضبط
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
              {currentTab === 'brand' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#716B62] mb-1">اسم العلامة (عربي)</label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#716B62] mb-1">الاسم اللاتيني (Latin)</label>
                      <input
                        type="text"
                        value={brandLatin}
                        onChange={(e) => setBrandLatin(e.target.value)}
                        className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#716B62] mb-1">
                      رقم واتساب لاستلام الطلبات (بصيغة دولية بدون +)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="962775179231"
                      className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#716B62] mb-1">رابط إنستغرام</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#716B62] mb-1">رابط فيسبوك</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#716B62] mb-1">عنوان الواجهة الرئيسي (Hero Title)</label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#716B62] mb-1">وصف الواجهة (Hero Lead)</label>
                    <textarea
                      rows={2}
                      value={heroLead}
                      onChange={(e) => setHeroLead(e.target.value)}
                      className="w-full bg-[#F8F6F1] border border-[#E6E1D8] rounded-xl px-3 py-2 text-[#24211D] focus:border-[#B08D57] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleSaveBrand}
                      className="px-5 py-2.5 rounded-xl bg-[#29251F] text-white font-semibold flex items-center gap-2 hover:bg-[#1A1814] transition-colors border border-[#B08D57]/30 shadow-xs"
                    >
                      <Save className="w-4 h-4 text-[#D6BE91]" />
                      <span>حفظ التعديلات في المتصفح</span>
                    </button>
                    {savedToast && (
                      <span className="text-xs text-[#B08D57] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>تم حفظ التعديلات فوراً!</span>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {currentTab === 'orders' && (
                <div>
                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-[#716B62] bg-[#F8F6F1] rounded-2xl border border-[#E6E1D8]">
                      <p>لا توجد طلبات واردة مسجلة بعد.</p>
                      <p className="text-[10px] mt-1 text-[#716B62]">
                        عند قيام أي زائر بتعبئة نموذج «طلب التصميم» سيظهر طلبه هنا فوراً.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-[#F8F6F1] p-4 rounded-xl border border-[#E6E1D8] text-right space-y-2"
                        >
                          <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-2">
                            <span className="font-bold text-[#24211D]">{ord.designName}</span>
                            <span className="text-[10px] text-[#716B62]">{ord.createdAt}</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#24211D]">
                            <div>
                              <span className="text-[#716B62] block">الأسماء:</span>
                              <span className="font-semibold text-[#24211D]">
                                {ord.groomOrHostName} {ord.brideName ? '& ' + ord.brideName : ''}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#716B62] block">الباقة:</span>
                              <span className="font-semibold text-[#B08D57]">{ord.packageType} ({ord.totalPrice})</span>
                            </div>
                            <div>
                              <span className="text-[#716B62] block">الموعد والقاعة:</span>
                              <span>{ord.date} · {ord.hallName}</span>
                            </div>
                            {ord.phone && (
                              <div>
                                <span className="text-[#716B62] block">هاتف العميل:</span>
                                <span dir="ltr" className="text-[#24211D] font-medium">{ord.phone}</span>
                              </div>
                            )}
                          </div>

                          {ord.notes && (
                            <p className="text-[10px] text-[#716B62] bg-white p-2 rounded-lg border border-[#E6E1D8]">
                              ملاحظات: {ord.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentTab === 'designs' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#716B62]">قائمة التصاميم المعتمدة في منصة دعوتك:</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {data.designs.map((d) => (
                      <div
                        key={d.slug}
                        className="bg-[#F8F6F1] p-3 rounded-xl border border-[#E6E1D8] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={d.thumb}
                            alt={d.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="overflow-hidden">
                            <h5 className="font-semibold text-[#24211D] truncate">{d.name}</h5>
                            <span className="text-[10px] text-[#716B62] font-serif uppercase truncate block">
                              {d.latin} · {d.cat}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {d.palette.slice(0, 3).map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentTab === 'export' && (
                <div className="space-y-4">
                  <div className="bg-[#F8F6F1] p-4 rounded-xl border border-[#E6E1D8] space-y-2">
                    <h5 className="font-semibold text-[#24211D]">تنزيل نسخة من ملف الإعدادات content.json</h5>
                    <p className="text-xs text-[#716B62]">
                      يمكنك تنزيل البيانات الكاملة للتصاميم والعلامة لاستخدامها على أي خادم استضافة أو حفظها كنسخة احتياطية.
                    </p>
                    <button
                      onClick={handleExportJson}
                      className="px-4 py-2 rounded-xl bg-white border border-[#E6E1D8] text-[#24211D] font-medium flex items-center gap-2 hover:bg-[#F1EEE7] transition-colors shadow-2xs"
                    >
                      <Download className="w-4 h-4 text-[#B08D57]" />
                      <span>تنزيل content.json</span>
                    </button>
                  </div>

                  <div className="bg-[#F8F6F1] p-4 rounded-xl border border-[#E6E1D8] space-y-2">
                    <h5 className="font-semibold text-[#DC2626]">استعادة الإعدادات الأصلية</h5>
                    <p className="text-xs text-[#716B62]">
                      حذف أي تعديلات محفوظة محلياً في هذا المتصفح والعودة للتصاميم الافتراضية.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الأصلية؟')) {
                          onResetDefaults();
                          setBrandName(data.brand.name);
                          setWhatsapp(data.brand.whatsapp);
                          alert('تمت استعادة الإعدادات الافتراضية بنجاح.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-[#DC2626]/30 text-[#DC2626] font-medium flex items-center gap-2 hover:bg-[#DC2626]/10 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>استعادة الافتراضي</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
