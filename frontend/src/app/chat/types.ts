export interface MessageType {
    id?: number;
    dm_id?: number;
    content: string;
    timestamp?: string;
    is_ai: boolean;
  }
  
  export interface WebSocketContextType {
    sendMessage: (message: MessageType) => void;
    message: MessageType | null;
    isNewMessage: boolean
  }

  export interface DirectMessageType {
    id?: number;
    user_id: number;
    title: string;
    created_at?: string;
    updated_at?: string;
  }