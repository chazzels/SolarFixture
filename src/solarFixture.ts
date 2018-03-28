class SolarFixture {
	
	/* module version info */
	readonly majorVersion: number = 0;
	readonly minorversion: number = 0;
	readonly revisionVersion: number = 1;
	readonly releaseType: string = "a";
	
	/* imported modules */
	private FixutreController: any = require("./fixture.controller/controller");
	private FixtureClient: any = require("./fixture.client/client");
	
	/* module variables */
	private controller: any;
	private client: any;
	
	constructor() {
		
		console.log(this.version());
		console.group();
		
		this.controller = new this.FixutreController();
		
		this.client = new this.FixtureClient();
		
		console.groupEnd();
		console.log("------------------------------");
		
	}
	
	/* log the application name and the current version */
	version(): string {
		
		let version = "Solar Fixture v"
			+ this.majorVersion.toString() + "."
			+ this.majorVersion.toString() + "."
			+ this.revisionVersion.toString()
			+ this.releaseType;
		
		return version;
		
	}
	
}

export = SolarFixture;