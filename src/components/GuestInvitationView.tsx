import React, { useState, useEffect, useRef } from 'react';
import { 
  CreatedInvitation, 
  WishEntry, 
  saveCreatedInvitation,
  formatWhatsAppRsvpUrl 
} from '../data/wedlinkData';
import { getTemplate } from '../templates/templateRegistry';

export interface GuestInvitationViewProps {
  invitation: CreatedInvitation;
  guestName?: string;
  onBackToMain?: () => void;
  isStandalone?: boolean;
}

export const GuestInvitationView: React.FC<GuestInvitationViewProps> = ({
  invitation,
  guestName,
  onBackToMain,
  isStandalone = false
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // RSVP Form States
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishes State
  const [wishes, setWishes] = useState<WishEntry[]>(
    invitation.wishes || [
      { id: '1', name: 'عائلة الخال أبو أحمد', text: 'ألف ألف مبارك، جمع الله بينكما في خير وسعادة وبارك لكما.', time: 'منذ ساعتين' },
      { id: '2', name: 'د. سامر وعائلته', text: 'مبارك الفرحة الكبرى، متشوقون للحضور ومشاركتكم أسعد اللحظات.', time: 'منذ ٥ ساعات' }
    ]
  );

  // Background instrumental audio
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-and-strings-1025.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    const nextState = !isEnvelopeOpen;
    setIsEnvelopeOpen(nextState);

    if (nextState && invitation.hasMusic && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {
          setIsPlayingMusic(false);
        });
    }
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleRsvpSubmit = (name: string, attending: boolean, count: number, note?: string) => {
    setRsvpSubmitted(true);

    // Save RSVP to invitation
    const newEntry = {
      id: String(Date.now()),
      guestName: name,
      attending,
      guestCount: count,
      submittedAt: new Date().toISOString(),
      note
    };

    const updatedInvitation: CreatedInvitation = {
      ...invitation,
      rsvps: [...(invitation.rsvps || []), newEntry]
    };
    saveCreatedInvitation(updatedInvitation);

    // Optional WhatsApp confirmation notification to host
    if (invitation.hostWhatsapp) {
      const coupleNames = invitation.bride ? `${invitation.groom} & ${invitation.bride}` : invitation.groom;
      const waUrl = formatWhatsAppRsvpUrl(name, attending, count, coupleNames, invitation.hostWhatsapp);
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    }
  };

  const handleAddWish = (name: string, text: string) => {
    const newWish: WishEntry = {
      id: String(Date.now()),
      name,
      text,
      time: 'الآن'
    };
    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);

    const updatedInvitation: CreatedInvitation = {
      ...invitation,
      wishes: updatedWishes
    };
    saveCreatedInvitation(updatedInvitation);
  };

  // Resolve Template Definition from Template Registry
  const templateDef = getTemplate(invitation.templateId, invitation.designSlug);
  const TemplateComponent = templateDef.Component;

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#151515] overflow-x-hidden">
      <div className="w-full max-w-lg min-h-screen bg-black/30 shadow-2xl flex flex-col justify-start">
        <TemplateComponent
          invitation={invitation}
          guestName={guestName || invitation.customGuestName}
          isEnvelopeOpen={isEnvelopeOpen}
          onOpenEnvelope={handleOpenEnvelope}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
          rsvpSubmitted={rsvpSubmitted}
          onRsvpSubmit={handleRsvpSubmit}
          wishes={wishes}
          onAddWish={handleAddWish}
          onBackToMain={onBackToMain}
          isStandalone={isStandalone}
        />
      </div>
    </div>
  );
};
