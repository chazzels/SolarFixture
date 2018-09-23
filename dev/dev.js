let SolarFixture = require("../js/solarFixture");
let fixture = new SolarFixture({
	perf: {},
	client: {
		serverAddress: "ws://0.0.0.0:8080"
	},
	controller: {
		driver: "dummy"
	}
});
