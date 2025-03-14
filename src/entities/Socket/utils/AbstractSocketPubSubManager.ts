export interface SocketPubSubManager {
  connect(): Promise<boolean>;
  disconnect(): void;
  registerSubscriber(): Promise<boolean>;
  unregisterSubscriber(): void;
  publish(destination: string, action: { type: string; payload: any }): void;
  subscribe(destination: string, func: (message: any) => void): void;
}

export abstract class AbstractSocketPubSubManager implements SocketPubSubManager {
  abstract publish(destination: string, action: { type: string; payload: any }): void;
  abstract subscribe(destination: string, func: (message: any) => void): void;
  abstract connect(): Promise<boolean>;
  abstract disconnect(): void;
  abstract registerSubscriber(): Promise<boolean>;
  abstract unregisterSubscriber(): void;
}
