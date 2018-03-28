class FixtureClient {
	
	/* imported modules */
	private WebSocketClient: any = require("./websocketClient");
	
	/* module variables */
	private client: any;
	
	constructor(serverAdress: string) {
		
		console.log("FIXTURE_CLIENT::STARTING");
		console.group();
		
		this.client = new this.WebSocketClient(serverAdress);
		
		console.groupEnd();
		
	}
	
}

export = FixtureClient;