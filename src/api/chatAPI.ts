import { sendMessage } from './../redux/chatReducer';
export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = 'pending' | 'ready' | 'error';

type MessagesReceivedSubcribersType = (message: ChatMessageAPIType[]) => void;
type StatusChangedSubcribersType = (status: StatusType) => void;
type EventsNames = 'messagesReceived' | 'statusChanged';

let ws: WebSocket | null = null;
const subscribers = {
  messagesReceived: [] as MessagesReceivedSubcribersType[],
  statusChanged: [] as StatusChangedSubcribersType[],
};

const closeHandler = () => {
  notifyStatus('pending');
  console.log('NETWORK_ERROR')
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messagesReceived'].forEach((s) => s(newMessages));
};
const openHandler = (e: Event) => {
  notifyStatus('ready');
};
const errorHandler = (e: Event) => {
  notifyStatus('error');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

const notifyStatus = (status: StatusType) => {
  subscribers['statusChanged'].forEach((s) => s(status));
};

const createChannel = () => {
  ws?.close();
  cleanUp();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifyStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
};

export const chatAPI = {
  subscribe: (
    eventName: EventsNames,
    callback: MessagesReceivedSubcribersType | StatusChangedSubcribersType
  ) => {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe: (
    eventName: EventsNames,
    callback: MessagesReceivedSubcribersType | StatusChangedSubcribersType
  ) => {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage: (message: string) => {
    ws?.send(message);
  },
  start: () => {
    createChannel();
  },
  stop: () => {
    subscribers['messagesReceived'] = [];
    subscribers['statusChanged'] = [];

    ws?.close();
    cleanUp();
  },
};
