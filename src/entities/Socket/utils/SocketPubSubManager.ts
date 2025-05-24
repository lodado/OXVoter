import { Client, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { SocketConnectionError } from "@/shared/constants/error/socketError";
 
const MAX_TRY_CONNECTION_COUNT = 1;
const TIMEOUT_DELAY = 15000;
const RECONNECT_DELAY = 5000;

export class SocketPubSubManager {
  private client: Client | null = null;
  private url: string;
  private subscriberCount: number = 0;
  private disconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string) {
    this.url = url;
  }

  canReconnect() {
    return this.subscriberCount > 0 && (!this.client || !this.client?.connected);
  }

  /**
   * connect
   * 소켓을 생성하고 이벤트 핸들러를 등록합니다.
   */
  async connect(onConnectSuccess?: () => void) {
    // 이미 연결되어 있으면 재연결하지 않음.
    if (this.client && this.client.connected) return Promise.resolve(true);

    let reconnectCount = 0;

    const timeout = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        reject(new SocketConnectionError({ message: "timeout" }));

        reconnectCount = MAX_TRY_CONNECTION_COUNT + 1;
      }, TIMEOUT_DELAY);
    });

    const tryToConnect = new Promise<boolean>((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => {
          const socket = new SockJS(this.url);

          return socket;
        },

        reconnectDelay: RECONNECT_DELAY,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,

        onConnect: () => {
          onConnectSuccess?.();

          resolve(true);
        },
        onStompError: (frame) => {
          console.error("STOMP 에러:", frame);

          reject(new SocketConnectionError({ message: "error" }));
        },
        debug: (str: string) => {
          console.log(str);
        },
        onWebSocketClose: (evt) => {
          console.log("소켓 연결 종료:", evt);

          reconnectCount++;
          if (this.client && reconnectCount >= MAX_TRY_CONNECTION_COUNT) {
            this.client?.deactivate(); // 클라이언트를 비활성화하여 더 이상 재연결하지 않음

            reject(new SocketConnectionError({ message: "timeout" }));
          }
        },
      });

      this.client.activate();
    });

    return Promise.race([tryToConnect, timeout]);
  }

  /**
   * disconnect
   * STOMP 클라이언트 연결을 종료합니다.
   */
  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.client = null;
      console.log("STOMP 연결 종료");
    }
  }

  /**
   * registerSubscriber
   * 구독자가 소켓 사용을 시작할 때 내부 카운트를 증가시키고,
   * 필요시 STOMP 연결을 시작합니다.
   */
  registerSubscriber(onConnectSuccess?: () => void) {
    this.subscriberCount += 1;

    // 기존에 예약된 disconnect 타이머가 있으면 취소
    if (this.disconnectTimer) {
      clearTimeout(this.disconnectTimer);
      this.disconnectTimer = null;
    }

    // 구독자가 1 이상인데 연결되어 있지 않다면 연결 시도
    if (!this.client || !this.client.connected) {
      return this.connect(onConnectSuccess);
    }

    return Promise.resolve(true);
  }

  /**
   * unregisterSubscriber
   * 구독자가 소켓 사용을 중단할 때 내부 카운트를 감소시키고,
   * 구독자가 0이면 5초 후 STOMP 연결을 종료합니다.
   */
  unregisterSubscriber() {
    console.log("unregisterSubscriber", this.subscriberCount, this);

    if (this.subscriberCount > 0) {
      this.subscriberCount -= 1;
    }

    // 구독자가 0이면 5초 후 연결 종료
    if (this.subscriberCount <= 0) {
      this.disconnectTimer = setTimeout(() => {
        this.disconnect();

        console.log("dis");
      }, 0);
    }

    return this.subscriberCount <= 0;
  }

  publish(destination: string = "/app/message", action: { [key: string]: any }) {
    if (this.client) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(action),
      });
    }
  }

  subscribe(destination: string = "/app/message", func: (message: IMessage) => void) {
    return this.client!.subscribe(destination, (message: IMessage) => {
      func(message);
    });
  }
}
