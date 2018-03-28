class WebSocketClient {
	
	private WebSocket: any = require("ws");
	private ws: any;
	
	constructor(serverAdress: string) {
		
		let that = this;
		
		console.log("SOCKET_CLIENT::STARTING");
		
		console.log("SOCKET_CLIENT::CONNECTING", serverAdress.toString());
		
		this.ws = new this.WebSocket(serverAdress.toString());
		
		this.ws.on('open', function socketOpen() {
			
			that.ws.send("meta-stuff");
			
		});
		
	}
	
	private sendMeta() {
		
		this.ws.send("meta-stuff");
		
	}
	
}

export = WebSocketClient;