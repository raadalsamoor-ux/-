import React from 'react';
import { ArrowUp, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { WedLinkData } from '../data/wedlinkData';

interface FooterProps {
  data: WedLinkData;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = `https://wa.me/${data.brand.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(data.brand.hello)}`;

  return (
    <footer id="main-footer" className="border-t border-[#E6E1D8] bg-[#F8F6F1] pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative text-center">
      <div className="max-w-4xl mx-auto">
        {/* Brand mark */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#29251F] border border-[#B08D57]/40 flex items-center justify-center text-[#B08D57] mb-3 shadow-2xs">
            <span className="font-serif text-xl font-bold select-none leading-none">د</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-2xl font-bold text-[#24211D]">
              دعوتك
            </span>
            <span className="font-serif text-xs tracking-[0.25em] uppercase text-[#B08D57] font-semibold">
              Da'watak
            </span>
          </div>
          <p className="text-xs text-[#716B62] mt-1.5">
            دعوات إلكترونية فاخرة لجميع المناسبات السعيدة
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white border border-[#E6E1D8] text-[#B08D57] hover:bg-[#F1EEE7] transition-colors flex items-center justify-center shadow-2xs"
            title="تواصل عبر واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {data.brand.instagram && (
            <a
              href={data.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white border border-[#E6E1D8] text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors flex items-center justify-center shadow-2xs"
              title="إنستغرام"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}

          {data.brand.facebook && (
            <a
              href={data.brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white border border-[#E6E1D8] text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors flex items-center justify-center shadow-2xs"
              title="فيسبوك"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-[#716B62] mb-8 pb-6 border-b border-[#E6E1D8]">
          <a href="#collection" className="hover:text-[#24211D] transition-colors">المجموعة</a>
          <a href="#features" className="hover:text-[#24211D] transition-colors">المميزات</a>
          <a href="#steps" className="hover:text-[#24211D] transition-colors">كيف نبدأ</a>
          <a href="#pricing" className="hover:text-[#24211D] transition-colors">الباقات</a>
          <a href="#faq" className="hover:text-[#24211D] transition-colors">الأسئلة الشائعة</a>
          <button onClick={onOpenAdmin} className="text-[#716B62] hover:text-[#24211D] transition-colors">
            لوحة الإدارة
          </button>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#716B62]">
          <p className="text-[11px]">
            {data.footer.note} · جميع الحقوق محفوظة © {new Date().getFullYear()} دعوتك
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#24211D] hover:text-[#B08D57] transition-colors"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
