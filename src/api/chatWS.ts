import WS from "./webSocket";
import { ChatMessageProps } from "./chatAPI";

export interface onMessageData {
	data: string;
}

export interface MessageResponse {
	type: string;
	content: ChatMessageProps | ChatMessageProps[];
}

export interface WSResponse {
	type: string;
	data: string;
}

class ChatWS extends WS {
	private offset: number;

	constructor() {
		super("/chats");
		this.offset = 0;
	}

	onceMessage(path: string, onMessage: (res: MessageResponse) => void): void {
		this.connect(path);
		this.rePing();
		this.addListener("message", wsResponse => {
			const { type, data } = wsResponse as unknown as WSResponse;
			const messageResponse: MessageResponse = {
				type,
				content: JSON.parse(data),
			};

			onMessage(messageResponse);
		});
	}

	setup(path: string, onMessage: (res: MessageResponse) => void): void {
		this.onceMessage(path, onMessage);
		this.addListener("open", () => {
			this.send({ type: "get old", content: `${this.offset}` });
		});
	}

	sendMessage(message: string): void {
		this.send({ type: "message", content: message });
	}

	shutdown(): void {
		super.shutdown();
		this.offset = 0;
	}

	increaseOffsetBy(by: number): void {
		this.offset += by;
	}
}

export default ChatWS;