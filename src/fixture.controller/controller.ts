class FixtureController {
	
	private driverClass: any;
	private driver: any;
	
	constructor(option: any) {
		
		console.log("FIXTURE_CONTROLLER::STARTING");
		console.group();
		
		this.driverLoader(option.driverProfile.toString(), this.driverStart);
		
		console.groupEnd();
		
	}
	
	private driverLoader(profileName: any, callback: any) {
		
		let that = this;
		
		let success = false;
		
		console.log("FIXTURE_CONTROLLER::LOAD_DRIVER:", profileName);
		
		if(profileName.toString() === "pca9685") {
			
			this.driverClass = require("./driver-pca9685");
			
			success = true;
			
		} else {
			
			console.log("FIXTURE_CONTROLLER::LOAD_FAIL:", profileName);
			
		}
		
		if(success) {
			
			callback(that);
			
		}
		
	}
	
	private driverStart(that: any) {
		
		console.log("*");
		
		
		that.driver = new that.driverClass();
		
	}
	
}

export = FixtureController;