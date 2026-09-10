import React from 'react';
import { CreatedInvitation } from '../data/wedlinkData';

export interface TemplateInvitationProps {
  invitation: CreatedInvitation;
  guestName?: string;
  // Envelope & Audio States
  isEnvelopeOpen: boolean;
  onOpenEnvelope: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  // Interactive RSVP
  rsvpSubmitted: boolean;
  onRsvpSubmit: (name: string, attending: boolean, count: number, note?: string) => void;
  // Interactive Wishes
  wishes: Array<{ id: string; name: string; text: string; time: string }>;
  onAddWish: (name: string, text: string) => void;
  // Navigation & Container options
  onBackToMain?: () => void;
  isStandalone?: boolean;
}

export interface TemplateDefinition {
  templateId: string;
  name: string;
  latinName: string;
  category: 'wedding' | 'henna' | 'grad' | string;
  description: string;
  palette: string[];
  tags: string[];
  Component: React.FC<TemplateInvitationProps>;
}
