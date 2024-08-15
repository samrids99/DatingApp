export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotUrl: string;
    content: string;
    dateRead?: Date;
    messageSent: string;
  }