/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_DATA, 
  WedLinkData, 
  DesignItem, 
  OrderRequest, 
  PackageTier,
  CreatedInvitation,
  decodeInvitation,
  getSavedInvitations
} from './data/wedlinkData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { FeaturesSection } from './components/FeaturesSection';
import { StepsSection } from './components/StepsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { InvitationPreviewModal } from './components/InvitationPreviewModal';
import { OrderModal } from './components/OrderModal';
import { AdminModal } from './components/AdminModal';
import { SelfServiceBuilderModal } from './components/SelfServiceBuilderModal';
import { GeneratedInvitationSuccessModal } from './components/GeneratedInvitationSuccessModal';
import { GuestInvitationView } from './components/GuestInvitationView';

export default function App() {
  // Load persisted store or use INITIAL_DATA
  const [data, setData] = useState<WedLinkData>(() => {
    try {
      const saved = localStorage.getItem('wedlink_data_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_DATA;
  });

  // Orders store
  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem('wedlink_orders_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'ORD-89421',
        createdAt: '١٠ سبتمبر ٢٠٢٦، ٠٩:٣٠ ص',
        designSlug: 'anasandrama',
        designName: 'الخمري المخملي',
        packageType: 'gold',
        category: 'عرس',
        groomOrHostName: 'محمد القيسي',
        brideName: 'دانا المجالي',
        date: '٢٤ أكتوبر ٢٠٢٦',
        time: '٧:٣٠ مساءً',
        hallName: 'فندق الفورسيزونز · قاعة الثريا',
        city: 'عمّان',
        phone: '0799887766',
        notes: 'يرجى إضافة مقطع قصير كمقدمة قبل فتح الظرف',
        includeCountdown: true,
        includeRsvp: true,
        includePersonalGuestLinks: false,
        includeWishesWall: true,
        totalPrice: '40 د.أ'
      }
    ];
  });

  // Check URL parameters for standalone invitation viewing (when guests or host open a generated link)
  const [standaloneInvitation, setStandaloneInvitation] = useState<CreatedInvitation | null>(null);
  const [standaloneGuestName, setStandaloneGuestName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const parseUrlInvitation = () => {
      try {
        let encodedData = '';
        let guest = '';
        let inviteId = '';

        // 1. Check hash parameters (e.g. #/view?c=... or #/view?data=... or #/view?invite=...)
        if (window.location.hash) {
          const qIndex = window.location.hash.indexOf('?');
          if (qIndex !== -1) {
            const hashQuery = window.location.hash.substring(qIndex + 1);
            const params = new URLSearchParams(hashQuery);
            encodedData = params.get('c') || params.get('data') || '';
            guest = params.get('guest') || '';
            inviteId = params.get('invite') || params.get('id') || '';
          }
        }

        // 2. Also check standard search query parameters (?c=... or ?data=... or ?invite=...)
        if (!encodedData && !inviteId && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          encodedData = params.get('c') || params.get('data') || '';
          guest = params.get('guest') || guest;
          inviteId = params.get('invite') || params.get('id') || '';
        }

        // 3. If inviteId exists and no encoded payload, load from saved invitations store
        if (inviteId && !encodedData) {
          const saved = getSavedInvitations();
          const found = saved.find(item => item.id === inviteId);
          if (found) {
            setStandaloneInvitation(found);
            setStandaloneGuestName(guest || undefined);
            return;
          }
        }

        // 4. If encoded compressed or base64 payload exists, decode it
        if (encodedData) {
          const decoded = decodeInvitation(encodedData);
          if (decoded) {
            setStandaloneInvitation(decoded);
            setStandaloneGuestName(guest || undefined);
          }
        }
      } catch (err) {
        console.error('Error parsing invitation URL', err);
      }
    };

    parseUrlInvitation();
    window.addEventListener('hashchange', parseUrlInvitation);
    return () => window.removeEventListener('hashchange', parseUrlInvitation);
  }, []);

  // Modal states
  const [previewDesign, setPreviewDesign] = useState<DesignItem | null>(null);
  const [orderDesign, setOrderDesign] = useState<DesignItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [initialOrderNames, setInitialOrderNames] = useState<{ groom: string; bride: string } | undefined>(undefined);

  // Self-Service Instant Builder States
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderSelectedDesign, setBuilderSelectedDesign] = useState<DesignItem | null>(null);
  const [generatedInvitation, setGeneratedInvitation] = useState<CreatedInvitation | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Save changes to localStorage
  const handleSaveData = (newData: WedLinkData) => {
    setData(newData);
    try {
      localStorage.setItem('wedlink_data_v1', JSON.stringify(newData));
    } catch {
      // Storage quota or disabled
    }
  };

  const handleResetDefaults = () => {
    setData(INITIAL_DATA);
    try {
      localStorage.removeItem('wedlink_data_v1');
    } catch {
      // Fallback
    }
  };

  const handleOrderSubmitted = (newOrder: OrderRequest) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('wedlink_orders_v1', JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  // Open order modal with specific design
  const handleOpenOrder = (design?: DesignItem, customNames?: { groom: string; bride: string }) => {
    if (design) {
      setOrderDesign(design);
    } else {
      setOrderDesign(data.designs[0]);
    }
    if (customNames) {
      setInitialOrderNames(customNames);
    } else {
      setInitialOrderNames(undefined);
    }
    setPreviewDesign(null);
    setIsOrderModalOpen(true);
  };

  // Open Self-Service Instant Generator
  const handleOpenBuilder = (design?: DesignItem) => {
    setBuilderSelectedDesign(design || data.designs[0]);
    setPreviewDesign(null);
    setIsOrderModalOpen(false);
    setIsBuilderOpen(true);
  };

  const handleInvitationGenerated = (inv: CreatedInvitation) => {
    setGeneratedInvitation(inv);
    setIsBuilderOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSelectPackageFromPricing = (pkg: PackageTier) => {
    handleOpenBuilder(data.designs[0]);
  };

  // If viewing a standalone guest invitation URL, render the guest view
  if (standaloneInvitation) {
    return (
      <GuestInvitationView
        invitation={standaloneInvitation}
        guestName={standaloneGuestName}
        onBackToMain={() => {
          window.location.hash = '';
          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          setStandaloneInvitation(null);
          setStandaloneGuestName(undefined);
        }}
        isStandalone={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#24211D] selection:bg-[#B08D57] selection:text-white font-serif">
      {/* Top sticky navigation */}
      <Navbar
        data={data}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOrderClick={() => handleOpenOrder()}
        onOpenBuilder={() => handleOpenBuilder()}
      />

      <main>
        {/* Hero with interactive 3D fan of invitation cards */}
        <Hero
          data={data}
          onSelectDesign={(design) => setPreviewDesign(design)}
          onOrderClick={() => handleOpenOrder()}
          onOpenBuilder={() => handleOpenBuilder()}
        />

        {/* Collection / Catalog of all 13 authentic designs with filters */}
        <Collection
          data={data}
          onPreviewDesign={(design) => setPreviewDesign(design)}
          onOrderDesign={(design) => handleOpenOrder(design)}
          onBuildDesign={(design) => handleOpenBuilder(design)}
        />

        {/* Feature showcase: Countdown, RSVP, Hall location, Schedule, Music */}
        <FeaturesSection data={data} />

        {/* Step-by-step: How to start */}
        <StepsSection
          data={data}
          onOrderClick={() => handleOpenBuilder()}
        />

        {/* Pricing packages: Silver, Gold Royal, Diamond VIP */}
        <PricingSection
          data={data}
          onSelectPackage={handleSelectPackageFromPricing}
        />

        {/* Frequently asked questions */}
        <FaqSection data={data} />
      </main>

      {/* Footer */}
      <Footer
        data={data}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Interactive Mobile Invitation Preview Modal */}
      <InvitationPreviewModal
        design={previewDesign}
        onClose={() => setPreviewDesign(null)}
        onOrder={(design, names) => handleOpenOrder(design, names)}
        whatsappNumber={data.brand.whatsapp}
      />

      {/* Complete Order & Customization Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedDesign={orderDesign}
        designs={data.designs}
        whatsappNumber={data.brand.whatsapp}
        onOrderSubmitted={handleOrderSubmitted}
        initialNames={initialOrderNames}
      />

      {/* Self-Service Instant Invitation Studio / Builder (100% Automated, No Intervention) */}
      <SelfServiceBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        designs={data.designs}
        selectedDesignInitial={builderSelectedDesign}
        onInvitationGenerated={handleInvitationGenerated}
        defaultHostWhatsapp={data.brand.whatsapp}
      />

      {/* Generated Instant Result Screen: Link, QR Code, Ready WhatsApp Broadcast, Personalized Guests */}
      <GeneratedInvitationSuccessModal
        isOpen={isSuccessModalOpen}
        invitation={generatedInvitation}
        onClose={() => setIsSuccessModalOpen(false)}
        onEdit={(inv) => {
          setIsSuccessModalOpen(false);
          setIsBuilderOpen(true);
        }}
        onOpenStandalonePreview={(inv, guestName) => {
          setStandaloneInvitation(inv);
          setStandaloneGuestName(guestName);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetDefaults={handleResetDefaults}
        orders={orders}
      />
    </div>
  );
}
