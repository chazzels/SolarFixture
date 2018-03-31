/* create a bew fixture client */
let SolarFixture = require("./js/solarFixture");

let fixture = new SolarFixture({
	client: {
	    serverAdress: "ws://0.0.0.0:8420/"
	},
	controller: {
	    driverProfile: "pca9685"
	}
	
});