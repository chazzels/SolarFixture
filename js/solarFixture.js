"use strict";
class SolarFixture {
    constructor(option) {
        this.majorVersion = 0;
        this.minorversion = 0;
        this.revisionVersion = 1;
        this.releaseType = "a";
        this.FixtureClient = require("./fixture.client/client");
        this.FixutreController = require("./fixture.controller/controller");
        console.log(this.version());
        console.group();
        this.client = new this.FixtureClient(option.client);
        this.controller = new this.FixutreController(option.controller);
        console.groupEnd();
        console.log("------------------------------");
    }
    version() {
        let version = "Solar Fixture v"
            + this.majorVersion.toString() + "."
            + this.majorVersion.toString() + "."
            + this.revisionVersion.toString()
            + this.releaseType;
        return version;
    }
}
module.exports = SolarFixture;
//# sourceMappingURL=solarFixture.js.map