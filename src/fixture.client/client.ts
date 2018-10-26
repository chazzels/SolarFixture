/*
*	module to abstract/normalize communcation to the websocket server.
*	TODO: implement browser / node detection to select which client moddule to use.
*/

class FixtureClient {
	
	/* imported modules */
	private WebSocketNodeClient: any = require("./websocketNodeClient");
	
	/* module variables */
	private client: any;
	
	constructor(option: any) {
		
		console.log("FIXTURE_CLIENT::STARTING");
		console.group();
		
		this.client = new this.WebSocketNodeClient(option.serverAddress);
		
		this.client.registerMessageListener(this.onMessage);
		
		console.groupEnd();
		
	}
	
	private onMessage(data:any) {
		
		console.log(data);
		
	}
	
}

export = FixtureClient;