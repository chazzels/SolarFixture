"use strict";
class FixtureController {
    constructor(option) {
        console.log("FIXTURE_CONTROLLER::STARTING");
        console.group();
        this.driverLoader(option.driverProfile.toString(), this.driverStart);
        console.groupEnd();
    }
    driverLoader(profileName, callback) {
        let that = this;
        let success = false;
        console.log("FIXTURE_CONTROLLER::LOAD_DRIVER:", profileName);
        if (profileName === "pca9685") {
            this.driverClass = require("./driver-pca9685");
            success = true;
        }
        else if (profileName === "dummy") {
            this.driverClass = require("./driver-dummy");
            success = true;
        }
        else {
            console.log("FIXTURE_CONTROLLER::LOAD_FAIL:", profileName);
        }
        if (success) {
            callback(that);
        }
    }
    driverStart(that) {
        that.driver = new that.driverClass();
    }
}
module.exports = FixtureController;
//# sourceMappingURL=controller.js.map