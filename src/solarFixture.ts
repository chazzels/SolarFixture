class SolarFixture {
	
	/* module version info */
	readonly majorVersion: number = 0;
	readonly minorversion: number = 0;
	readonly revisionVersion: number = 1;
	readonly releaseType: string = "a";
	
	constructor() {
		
		console.log(this.version());
		console.group();
		
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