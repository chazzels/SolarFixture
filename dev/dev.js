let SolarFixture = require("../js/solarFixture");
let fixture = new SolarFixture({
	perf: {},
	client: {
		serverAddress: "ws://192.168.4.40"
	},
	controller: {
		driver: "dummy"
	}
});
