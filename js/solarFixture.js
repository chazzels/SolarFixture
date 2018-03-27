"use strict";
class SolarFixture {
    constructor() {
        this.majorVersion = 0;
        this.minorversion = 0;
        this.revisionVersion = 1;
        this.releaseType = "a";
        console.log(this.version());
        console.group();
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