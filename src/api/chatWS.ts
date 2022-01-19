import WS from "./webSocket";
import { ChatMessage } from "./chatAPI";

export interface onMessageData {
	data: string;
}

export interface MessageResponse {
	type: string;
	content: ChatMessage | ChatMessage[];
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

	setup(path: string, onMessage: (d: MessageResponse) => void) {
		this.connect(path);
		this.rePing();
		this.addListener("message", wsResponse => {
			const { type, data } = wsResponse as unknown as WSResponse;
			const messageResponse: MessageResponse = {
				type,
				content: JSON.parse(data),
			};
			console.log("Получены данные", messageResponse);
			onMessage(messageResponse);
		});

		this.addListener("open", () => {
			this.getOldMessages();
		});
	}

	sendMessage(message: string): void {
		console.log("Send", message);
		this.send({ type: "message", content: message });
	}

	shutdown(): void {
		super.shutdown();
		this.offset = 0;
	}

	getOldMessages(): void {
		this.send({ type: "get old", content: `${this.offset}` });
	}

	increaseOffsetBy(by: number): void {
		this.offset += by;
	}
}

export default ChatWS;