
export enum Sender {
  User = 'user',
  Bot = 'bot',
  Error = 'error',
}

export interface Message {
  text: string;
  sender: Sender;
}

export type ActiveView = 'analyzer' | 'chat';
