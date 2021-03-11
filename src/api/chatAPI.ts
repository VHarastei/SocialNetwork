import { sendMessage } from './../redux/chatReducer';
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type SubcribersType = (message: ChatMessageType[]) => void;

let ws: WebSocket | null = null;
let subscribers = [] as SubcribersType[];

const closeHandler = () => {
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
};

const createChannel = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.close();

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
};

export const chatAPI = {
  subscribe: (callback: SubcribersType) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe: (callback: SubcribersType) => {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage: (message: string) => {
    ws?.send(message);
  },
  start: () => {
    createChannel();
  },
  stop: () => {
    subscribers = [];
    ws?.close();
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
  },
};
