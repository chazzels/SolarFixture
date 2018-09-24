/*
*	module to abstract/normalize communcation to the websocket server.
*	TODO: implement browser / node detection to select which client moddule to use.
*/

class FixtureClient {
	
	/* imported modules */
	private WebSocketNodeClient: any = require("./websocketNodeClient");
	private WebSocketBrowserClient: any = require("./websocketBrowserClient");
	
	/* module variables */
	private client: any;
	
	constructor(option: any) {
		
		console.log("FIXTURE_CLIENT::STARTING");
		console.group();
		
		this.client = new this.WebSocketNodeClient(option.serverAddress);
		
		console.groupEnd();
		
	}
	
}

export = FixtureClient;