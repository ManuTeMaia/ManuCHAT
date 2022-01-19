export interface SocketMessageData {
	type: string;
	content?: string;
}

export default abstract class WS {
	static DEFAULT_INTERVAL = 60 * 1000;
	static API_URL = "wss://ya-praktikum.tech/ws";
	protected endpoint: string;
	protected pingInterval: NodeJS.Timeout | null;
	protected ws: WebSocket | null;

	protected constructor(endpoint: string) {
		this.endpoint = `${WS.API_URL}${endpoint}`;
		this.ws = null;
		this.pingInterval = null;
	}

	connect(to: string): void {
		this.ws = new WebSocket(this.endpoint + to);
		console.log("Connected", this.ws);
	}

	shutdown(): void {
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}

		this.ws?.close();
		console.log("Connection close");
	}

	rePing(interval: number = WS.DEFAULT_INTERVAL): void {
		this.pingInterval = setInterval(() => this.ping, interval);
	}

	ping(): void {
		this.send({ type: "ping" });
	}

	addListener(event: string, listener: EventListener): void {
		console.log(event, listener);
		this.ws?.addEventListener(event, listener);
	}

	send(messageData: SocketMessageData): void {
		console.log(messageData);
		this.ws?.send(JSON.stringify(messageData));
	}
}
