class FixtureClient {
	
	/* imported modules */
	private WebSocketClient: any = require("./websocketClient");
	
	/* module variables */
	private client: any;
	
	constructor(option: any) {
		
		console.log("FIXTURE_CLIENT::STARTING");
		console.group();
		
		this.client = new this.WebSocketClient(option.serverAdress);
		
		console.groupEnd();
		
	}
	
}

export = FixtureClient;