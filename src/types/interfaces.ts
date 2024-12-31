export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'lead' | 'member';
}

export interface CalendarEvent {
  id: string;
  subject: string;
  start: Date;
  end: Date;
  organizerId: string;
  attendeeIds: string[];
  isRecurring: boolean;
  recurrencePattern?: string;
  responseStatus: 'accepted' | 'declined' | 'tentative';
  location: string;
  type: 'single' | 'recurring' | 'exception';
}

export interface TeamsMessage {
  id: string;
  senderId: string;
  recipientIds: string[];
  content: string;
  timestamp: Date;
  channelId?: string;
  isGroupChat: boolean;
  hasReplies: boolean;
  reactions: string[];
}
