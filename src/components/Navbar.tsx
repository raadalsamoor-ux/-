import React, { useState, useEffect } from 'react';
import { MessageCircle, Settings, Menu, X, Wand2, ArrowLeft } from 'lucide-react';
import { WedLinkData } from '../data/wedlinkData';

interface NavbarProps {
  data: WedLinkData;
  onOpenAdmin: () => void;
  onOrderClick: () => void;
  onOpenBuilder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ data, onOpenAdmin, onOrderClick, onOpenBuilder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappHref = `https://wa.me/${data.brand.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(data.brand.hello)}`;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E6E1D8] shadow-sm py-3.5'
          : 'bg-[#F8F6F1]/80 backdrop-blur-sm border-b border-[#E6E1D8]/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3.5 group" id="brand-logo-link">
          <div className="w-9 h-9 rounded-lg bg-[#29251F] border border-[#B08D57]/40 flex items-center justify-center text-[#B08D57] transition-all group-hover:border-[#B08D57] group-hover:scale-105 shadow-sm">
            <span className="font-serif text-lg font-bold select-none leading-none">د</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-xl font-bold text-[#24211D] tracking-tight">
                دعوتك
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#B08D57] uppercase font-serif font-semibold">
                Da'watak
              </span>
            </div>
            <p className="text-[11px] text-[#716B62] font-normal">دعوات إلكترونية فاخرة</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#716B62]">
          <a
            href="#collection"
            className="hover:text-[#24211D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            المجموعة الفاخرة
          </a>
          <a
            href="#features"
            className="hover:text-[#24211D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            المزايا التفاعلية
          </a>
          <a
            href="#steps"
            className="hover:text-[#24211D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            خطوات التجهيز
          </a>
          <a
            href="#pricing"
            className="hover:text-[#24211D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            الباقات
          </a>
          <a
            href="#faq"
            className="hover:text-[#24211D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            الأسئلة الشائعة
          </a>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Admin button */}
          <button
            id="open-admin-btn"
            onClick={onOpenAdmin}
            title="لوحة التحكم"
            className="p-2 rounded-lg text-[#716B62] hover:text-[#24211D] hover:bg-[#F1EEE7] transition-colors border border-transparent"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Quick WhatsApp */}
          <a
            id="navbar-whatsapp-link"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#24211D] bg-white border border-[#E6E1D8] hover:bg-[#F1EEE7] transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>استشارة</span>
          </a>

          {/* Instant Self-Service Builder CTA */}
          {onOpenBuilder && (
            <button
              id="navbar-instant-builder-btn"
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#29251F] hover:bg-[#1A1814] active:scale-[0.98] transition-all shadow-sm border border-[#B08D57]/30"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#D6BE91]" />
              <span>صمّم دعوتك</span>
            </button>
          )}

          {/* Custom Order CTA */}
          <button
            id="navbar-order-btn"
            onClick={onOrderClick}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
          >
            <span>طلب خاص</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#716B62]" />
          </button>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#24211D] hover:bg-[#F1EEE7] transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6E1D8] px-6 py-5 flex flex-col gap-3 text-sm font-medium text-[#24211D] shadow-md">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#F1EEE7] hover:text-[#B08D57]"
          >
            المجموعة الفاخرة
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#F1EEE7] hover:text-[#B08D57]"
          >
            المزايا التفاعلية
          </a>
          <a
            href="#steps"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#F1EEE7] hover:text-[#B08D57]"
          >
            خطوات التجهيز
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#F1EEE7] hover:text-[#B08D57]"
          >
            الباقات والتسعير
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#F1EEE7] hover:text-[#B08D57]"
          >
            الأسئلة الشائعة
          </a>
          {onOpenBuilder && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuilder();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#29251F] text-white text-xs font-semibold mt-2 hover:bg-[#1A1814] transition-colors"
            >
              <Wand2 className="w-4 h-4 text-[#D6BE91]" />
              <span>صمّم دعوتك بنفسك فوراً</span>
            </button>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-[#24211D] border border-[#E6E1D8] text-xs font-medium hover:bg-[#F1EEE7] transition-colors mt-1"
          >
            <MessageCircle className="w-4 h-4 text-[#B08D57]" />
            <span>تواصل مباشرة عبر واتساب</span>
          </a>
        </div>
      )}
    </header>
  );
};
