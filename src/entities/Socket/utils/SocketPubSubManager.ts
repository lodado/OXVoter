import { PubSubManagerClass } from "@/shared/utils/StorageStrategy/PublisherSubscriber/PubSubManager";

export class SocketPubSubManager extends PubSubManagerClass {
  private socket: WebSocket | null = null;
  private url: string;
  private subscriberCount: number = 0;
  private disconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string) {
    super();
    this.url = url;
  }

  /**
   * connect
   * 소켓을 생성하고 이벤트 핸들러를 등록합니다.
   */
  async connect() {
    // 이미 연결되어 있으면 재연결하지 않음.
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket 연결 성공");
        resolve(true);
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          // 메시지 형식이 { type, payload } 형태인지 확인
          if (message.type && message.payload !== undefined) {
            this.publish(message);
          } else {
            console.warn("알 수 없는 메시지 형식:", message);
          }
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket 연결 종료");
        reject(false);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket 에러:", error);
      };
    });
  }

  /**
   * disconnect
   * 소켓 연결을 종료합니다.
   */
  private disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
      this.socket = null;
      console.log("WebSocket 수동 종료");
    }
  }

  /**
   * registerSubscriber
   * 구독자(컴포넌트)가 소켓을 사용하기 시작할 때 호출하여 내부 카운트를 증가시키고,
   * 카운터가 1 이상이면 소켓 연결을 보장합니다.
   */
  registerSubscriber() {
    this.subscriberCount += 1;

    // 기존에 예약된 disconnect 타이머가 있으면 취소
    if (this.disconnectTimer) {
      clearTimeout(this.disconnectTimer);
      this.disconnectTimer = null;
    }

    // 구독자가 1 이상인데 소켓이 연결되어 있지 않다면 연결 시도
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return this.connect();
    }

    return Promise.resolve(true);
  }

  /**
   * unregisterSubscriber
   * 구독자(컴포넌트)가 소켓 사용을 중단할 때 호출하여 내부 카운트를 감소시키고,
   * 구독자 수가 0이면 5초 후 소켓 연결을 종료합니다.
   */
  unregisterSubscriber() {
    if (this.subscriberCount > 0) {
      this.subscriberCount -= 1;
    }
    console.log("구독자 해제, 현재 구독자 수:", this.subscriberCount);

    // 구독자가 0이 되면 5초 후 소켓 종료
    if (this.subscriberCount <= 0) {
      this.disconnectTimer = setTimeout(() => {
        console.log("구독자 0개 상태 5초 후 소켓 종료");
        this.disconnect();
      }, 5000);
    }
  }

  /**
   * send
   * 소켓 연결이 활성화된 경우, 지정한 action({ type, payload })을 JSON 형식으로 전송합니다.
   */
  send(action: { type: string; payload: any }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(action));
    } else {
      console.error("WebSocket이 연결되어 있지 않습니다.");
    }
  }
}
