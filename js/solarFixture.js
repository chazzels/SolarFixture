"use strict";
class SolarFixture {
    constructor(option) {
        this.majorVersion = 0;
        this.minorversion = 0;
        this.revisionVersion = 1;
        this.releaseType = "a";
        this.FixutreController = require("./fixture.controller/controller");
        this.FixtureClient = require("./fixture.client/client");
        console.log(this.version());
        console.group();
        this.controller = new this.FixutreController();
        this.client = new this.FixtureClient(option.serverAdress);
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